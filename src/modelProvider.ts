import * as vscode from 'vscode';
import axios from 'axios';

interface ModelConfig {
    model: string;
    apiKey: string;
    apiEndpoint: string;
    modelName: string;
    temperature: number;
    maxTokens: number;
}

export class ModelProvider {
    private getConfig(): ModelConfig {
        const config = vscode.workspace.getConfiguration('copilotChatCN');
        
        const model = config.get<string>('model', 'qwen');
        const apiKey = config.get<string>('apiKey', '');
        const customEndpoint = config.get<string>('apiEndpoint', '');
        const modelName = config.get<string>('modelName', '');
        const temperature = config.get<number>('temperature', 0.7);
        const maxTokens = config.get<number>('maxTokens', 2048);

        // Set default endpoints if not provided
        let apiEndpoint = customEndpoint;
        if (!apiEndpoint) {
            switch (model) {
                case 'qwen':
                    apiEndpoint = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';
                    break;
                case 'baichuan':
                    apiEndpoint = 'https://api.baichuan-ai.com/v1/chat/completions';
                    break;
                case 'chatglm':
                    apiEndpoint = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
                    break;
                default:
                    apiEndpoint = 'https://api.openai.com/v1/chat/completions';
            }
        }

        // Set default model names if not provided
        let finalModelName = modelName;
        if (!finalModelName) {
            switch (model) {
                case 'qwen':
                    finalModelName = 'qwen-max';
                    break;
                case 'baichuan':
                    finalModelName = 'Baichuan2-Turbo';
                    break;
                case 'chatglm':
                    finalModelName = 'glm-4';
                    break;
                default:
                    finalModelName = 'gpt-3.5-turbo';
            }
        }

        return {
            model,
            apiKey,
            apiEndpoint,
            modelName: finalModelName,
            temperature,
            maxTokens
        };
    }

    async sendMessage(prompt: string, token: vscode.CancellationToken): Promise<string> {
        const config = this.getConfig();

        if (!config.apiKey) {
            throw new Error('请先配置API密钥。打开设置（Ctrl+,）搜索 "Copilot Chat CN" 并设置 API Key。');
        }

        try {
            switch (config.model) {
                case 'qwen':
                    return await this.callQwenAPI(config, prompt, token);
                case 'baichuan':
                    return await this.callBaichuanAPI(config, prompt, token);
                case 'chatglm':
                    return await this.callChatGLMAPI(config, prompt, token);
                default:
                    throw new Error(`不支持的模型: ${config.model}`);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.error?.message || error.response?.data?.message || error.message;
                throw new Error(`API调用失败: ${message}`);
            }
            throw error;
        }
    }

    private async callQwenAPI(config: ModelConfig, prompt: string, token: vscode.CancellationToken): Promise<string> {
        // Qwen uses a different API structure for DashScope
        const abortController = new AbortController();
        token.onCancellationRequested(() => abortController.abort());

        const response = await axios.post(
            config.apiEndpoint,
            {
                model: config.modelName,
                input: {
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ]
                },
                parameters: {
                    temperature: config.temperature,
                    max_tokens: config.maxTokens,
                    result_format: 'message'
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${config.apiKey}`,
                    'Content-Type': 'application/json'
                },
                signal: abortController.signal
            }
        );

        if (response.data.output?.choices?.[0]?.message?.content) {
            return response.data.output.choices[0].message.content;
        } else if (response.data.output?.text) {
            return response.data.output.text;
        } else {
            throw new Error('无效的API响应格式');
        }
    }

    private async callBaichuanAPI(config: ModelConfig, prompt: string, token: vscode.CancellationToken): Promise<string> {
        // Baichuan uses OpenAI-compatible API
        const abortController = new AbortController();
        token.onCancellationRequested(() => abortController.abort());

        const response = await axios.post(
            config.apiEndpoint,
            {
                model: config.modelName,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: config.temperature,
                max_tokens: config.maxTokens
            },
            {
                headers: {
                    'Authorization': `Bearer ${config.apiKey}`,
                    'Content-Type': 'application/json'
                },
                signal: abortController.signal
            }
        );

        if (response.data.choices?.[0]?.message?.content) {
            return response.data.choices[0].message.content;
        } else {
            throw new Error('无效的API响应格式');
        }
    }

    private async callChatGLMAPI(config: ModelConfig, prompt: string, token: vscode.CancellationToken): Promise<string> {
        // ChatGLM uses OpenAI-compatible API
        const abortController = new AbortController();
        token.onCancellationRequested(() => abortController.abort());

        const response = await axios.post(
            config.apiEndpoint,
            {
                model: config.modelName,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: config.temperature,
                max_tokens: config.maxTokens
            },
            {
                headers: {
                    'Authorization': `Bearer ${config.apiKey}`,
                    'Content-Type': 'application/json'
                },
                signal: abortController.signal
            }
        );

        if (response.data.choices?.[0]?.message?.content) {
            return response.data.choices[0].message.content;
        } else {
            throw new Error('无效的API响应格式');
        }
    }
}
