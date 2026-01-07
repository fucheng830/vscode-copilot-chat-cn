# 配置示例

## 通义千问（Qwen）配置示例

```json
{
  "copilotChatCN.model": "qwen",
  "copilotChatCN.apiKey": "sk-xxxxxxxxxxxxxxxxxxxxxxxx",
  "copilotChatCN.modelName": "qwen-max",
  "copilotChatCN.temperature": 0.7,
  "copilotChatCN.maxTokens": 4096
}
```

其他可用的通义千问模型：
- `qwen-max` - 最强模型
- `qwen-plus` - 平衡性能
- `qwen-turbo` - 快速响应

## 百川（Baichuan）配置示例

```json
{
  "copilotChatCN.model": "baichuan",
  "copilotChatCN.apiKey": "your-baichuan-api-key",
  "copilotChatCN.modelName": "Baichuan2-Turbo",
  "copilotChatCN.temperature": 0.7,
  "copilotChatCN.maxTokens": 2048
}
```

其他可用的百川模型：
- `Baichuan2-Turbo` - 快速对话
- `Baichuan2-53B` - 大参数模型

## 智谱（ChatGLM）配置示例

```json
{
  "copilotChatCN.model": "chatglm",
  "copilotChatCN.apiKey": "your-chatglm-api-key",
  "copilotChatCN.modelName": "glm-4",
  "copilotChatCN.temperature": 0.7,
  "copilotChatCN.maxTokens": 2048
}
```

其他可用的智谱模型：
- `glm-4` - 最新版本
- `glm-3-turbo` - 快速版本

## 自定义API端点示例

如果您使用自部署的模型或代理服务：

```json
{
  "copilotChatCN.model": "qwen",
  "copilotChatCN.apiKey": "your-api-key",
  "copilotChatCN.apiEndpoint": "https://your-custom-endpoint.com/v1/chat/completions",
  "copilotChatCN.modelName": "your-model-name",
  "copilotChatCN.temperature": 0.7,
  "copilotChatCN.maxTokens": 2048
}
```

## 参数说明

### temperature（温度）
- 范围：0-2
- 较低值（如 0.2）：更确定性和集中的输出
- 较高值（如 1.0）：更随机和创造性的输出
- 建议：代码生成使用 0.5-0.7

### maxTokens（最大令牌数）
- 范围：1-100000（根据模型而定）
- 控制生成内容的最大长度
- 建议：一般对话 2048，长文本 4096-8192

## 工作区配置

您也可以在工作区级别配置，在项目根目录创建 `.vscode/settings.json`：

```json
{
  "copilotChatCN.model": "qwen",
  "copilotChatCN.apiKey": "workspace-specific-key",
  "copilotChatCN.modelName": "qwen-max"
}
```

**注意**：不要将包含API密钥的配置文件提交到版本控制系统！
