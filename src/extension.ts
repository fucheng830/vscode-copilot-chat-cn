import * as vscode from 'vscode';
import { ModelProvider } from './modelProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('Copilot Chat CN extension is now active!');

    // Create model provider
    const modelProvider = new ModelProvider();

    // Register chat participant
    const participant = vscode.chat.createChatParticipant(
        'vscode-copilot-chat-cn.cn-model',
        async (
            request: vscode.ChatRequest,
            context: vscode.ChatContext,
            stream: vscode.ChatResponseStream,
            token: vscode.CancellationToken
        ) => {
            try {
                // Handle different commands
                if (request.command === 'explain') {
                    await handleExplainCommand(request, stream, modelProvider, token);
                } else if (request.command === 'refactor') {
                    await handleRefactorCommand(request, stream, modelProvider, token);
                } else if (request.command === 'fix') {
                    await handleFixCommand(request, stream, modelProvider, token);
                } else if (request.command === 'test') {
                    await handleTestCommand(request, stream, modelProvider, token);
                } else if (request.command === 'docs') {
                    await handleDocsCommand(request, stream, modelProvider, token);
                } else {
                    // Default chat behavior
                    await handleChatRequest(request, stream, modelProvider, token);
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                stream.markdown(`❌ 错误: ${errorMessage}\n\n请检查您的API配置（API密钥、端点等）。`);
            }
        }
    );

    participant.iconPath = vscode.Uri.file(context.asAbsolutePath('resources/icon.png'));

    context.subscriptions.push(participant);
}

async function handleChatRequest(
    request: vscode.ChatRequest,
    stream: vscode.ChatResponseStream,
    modelProvider: ModelProvider,
    token: vscode.CancellationToken
) {
    const prompt = request.prompt;
    
    stream.progress('正在思考...');
    
    const response = await modelProvider.sendMessage(prompt, token);
    
    stream.markdown(response);
}

async function handleExplainCommand(
    request: vscode.ChatRequest,
    stream: vscode.ChatResponseStream,
    modelProvider: ModelProvider,
    token: vscode.CancellationToken
) {
    const editor = vscode.window.activeTextEditor;
    const selection = editor?.selection;
    const selectedText = editor?.document.getText(selection);

    if (!selectedText) {
        stream.markdown('请先选择要解释的代码。');
        return;
    }

    const languageId = editor?.document.languageId || '未知';
    const prompt = `请详细解释以下${languageId}代码的功能和实现原理：\n\n\`\`\`${languageId}\n${selectedText}\n\`\`\``;

    stream.progress('正在分析代码...');
    
    const response = await modelProvider.sendMessage(prompt, token);
    
    stream.markdown(response);
}

async function handleRefactorCommand(
    request: vscode.ChatRequest,
    stream: vscode.ChatResponseStream,
    modelProvider: ModelProvider,
    token: vscode.CancellationToken
) {
    const editor = vscode.window.activeTextEditor;
    const selection = editor?.selection;
    const selectedText = editor?.document.getText(selection);

    if (!selectedText) {
        stream.markdown('请先选择要重构的代码。');
        return;
    }

    const languageId = editor?.document.languageId || '未知';
    const prompt = `请重构以下${languageId}代码，提高其可读性、性能和可维护性，并说明改进的原因：\n\n\`\`\`${languageId}\n${selectedText}\n\`\`\``;

    stream.progress('正在重构代码...');
    
    const response = await modelProvider.sendMessage(prompt, token);
    
    stream.markdown(response);
}

async function handleFixCommand(
    request: vscode.ChatRequest,
    stream: vscode.ChatResponseStream,
    modelProvider: ModelProvider,
    token: vscode.CancellationToken
) {
    const editor = vscode.window.activeTextEditor;
    const selection = editor?.selection;
    const selectedText = editor?.document.getText(selection);

    if (!selectedText) {
        stream.markdown('请先选择有问题的代码。');
        return;
    }

    const languageId = editor?.document.languageId || '未知';
    const additionalContext = request.prompt ? `\n问题描述：${request.prompt}` : '';
    const prompt = `请分析并修复以下${languageId}代码中的问题：${additionalContext}\n\n\`\`\`${languageId}\n${selectedText}\n\`\`\``;

    stream.progress('正在修复代码...');
    
    const response = await modelProvider.sendMessage(prompt, token);
    
    stream.markdown(response);
}

async function handleTestCommand(
    request: vscode.ChatRequest,
    stream: vscode.ChatResponseStream,
    modelProvider: ModelProvider,
    token: vscode.CancellationToken
) {
    const editor = vscode.window.activeTextEditor;
    const selection = editor?.selection;
    const selectedText = editor?.document.getText(selection);

    if (!selectedText) {
        stream.markdown('请先选择要生成测试的代码。');
        return;
    }

    const languageId = editor?.document.languageId || '未知';
    const prompt = `请为以下${languageId}代码生成完整的单元测试用例，包括正常情况和边界情况：\n\n\`\`\`${languageId}\n${selectedText}\n\`\`\``;

    stream.progress('正在生成测试用例...');
    
    const response = await modelProvider.sendMessage(prompt, token);
    
    stream.markdown(response);
}

async function handleDocsCommand(
    request: vscode.ChatRequest,
    stream: vscode.ChatResponseStream,
    modelProvider: ModelProvider,
    token: vscode.CancellationToken
) {
    const editor = vscode.window.activeTextEditor;
    const selection = editor?.selection;
    const selectedText = editor?.document.getText(selection);

    if (!selectedText) {
        stream.markdown('请先选择要生成文档的代码。');
        return;
    }

    const languageId = editor?.document.languageId || '未知';
    const prompt = `请为以下${languageId}代码生成详细的文档注释（包括参数说明、返回值、使用示例等）：\n\n\`\`\`${languageId}\n${selectedText}\n\`\`\``;

    stream.progress('正在生成文档...');
    
    const response = await modelProvider.sendMessage(prompt, token);
    
    stream.markdown(response);
}

export function deactivate() {}
