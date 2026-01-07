# VSCode Copilot Chat CN - 国产模型支持

一个支持中国国产AI大模型的VSCode聊天扩展，让您可以在VSCode中使用通义千问（Qwen）、百川（Baichuan）、智谱（ChatGLM）等国产模型进行代码辅助和对话。

## ✨ 特性

- 🇨🇳 **支持国产AI模型**：通义千问（Qwen）、百川（Baichuan）、智谱ChatGLM
- 💬 **智能聊天助手**：在VSCode中直接与AI对话
- 🔧 **代码辅助命令**：
  - `/explain` - 解释代码
  - `/refactor` - 重构代码
  - `/fix` - 修复代码问题
  - `/test` - 生成测试用例
  - `/docs` - 生成代码文档
- ⚙️ **灵活配置**：支持自定义API端点、模型参数等
- 🔒 **隐私安全**：API密钥本地存储，不会上传到云端

## 📦 安装

1. 从VSCode扩展市场搜索并安装 "Copilot Chat CN"
2. 或者手动安装：
   - 下载 `.vsix` 文件
   - 在VSCode中按 `Ctrl+Shift+P`（Mac: `Cmd+Shift+P`）
   - 选择 "Extensions: Install from VSIX..."
   - 选择下载的文件

## 🚀 快速开始

### 1. 获取API密钥

根据您想使用的模型，从对应平台获取API密钥：

- **通义千问（Qwen）**: 访问 [阿里云百炼平台](https://dashscope.aliyuncs.com/)
- **百川（Baichuan）**: 访问 [百川智能官网](https://platform.baichuan-ai.com/)
- **智谱（ChatGLM）**: 访问 [智谱AI开放平台](https://open.bigmodel.cn/)

### 2. 配置扩展

1. 打开VSCode设置（`Ctrl+,` 或 `Cmd+,`）
2. 搜索 "Copilot Chat CN"
3. 配置以下选项：
   - **Model**: 选择要使用的模型（qwen、baichuan、chatglm）
   - **API Key**: 输入您的API密钥
   - **API Endpoint**: （可选）自定义API端点
   - **Model Name**: （可选）指定具体的模型版本
   - **Temperature**: 控制回复的随机性（0-2，默认0.7）
   - **Max Tokens**: 最大token数量（默认2048）

### 3. 开始使用

1. 打开VSCode聊天面板（`Ctrl+Alt+I` 或 `Cmd+Alt+I`）
2. 在聊天输入框中输入 `@cn` 来使用国产模型助手
3. 输入您的问题或使用斜杠命令

## 📖 使用示例

### 基本对话
```
@cn 如何在Python中实现单例模式？
```

### 代码解释
1. 选择代码片段
2. 在聊天中输入：
```
@cn /explain
```

### 代码重构
1. 选择需要重构的代码
2. 在聊天中输入：
```
@cn /refactor
```

### 修复代码
1. 选择有问题的代码
2. 在聊天中输入：
```
@cn /fix 这段代码运行时出现空指针异常
```

### 生成测试
1. 选择要测试的函数或类
2. 在聊天中输入：
```
@cn /test
```

### 生成文档
1. 选择需要文档的代码
2. 在聊天中输入：
```
@cn /docs
```

## ⚙️ 配置说明

### 支持的模型

| 模型 | 默认API端点 | 默认模型名称 | 说明 |
|-----|-----------|------------|-----|
| qwen | https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation | qwen-max | 阿里云通义千问 |
| baichuan | https://api.baichuan-ai.com/v1/chat/completions | Baichuan2-Turbo | 百川智能 |
| chatglm | https://open.bigmodel.cn/api/paas/v4/chat/completions | glm-4 | 智谱AI |

### 高级配置

您可以在 `.vscode/settings.json` 中进行更详细的配置：

```json
{
  "copilotChatCN.model": "qwen",
  "copilotChatCN.apiKey": "your-api-key-here",
  "copilotChatCN.modelName": "qwen-max",
  "copilotChatCN.temperature": 0.7,
  "copilotChatCN.maxTokens": 4096
}
```

## 🔧 开发

### 从源码构建

```bash
# 克隆仓库
git clone https://github.com/fucheng830/vscode-copilot-chat-cn.git
cd vscode-copilot-chat-cn

# 安装依赖
npm install

# 编译
npm run compile

# 在VSCode中按F5启动调试
```

### 项目结构

```
vscode-copilot-chat-cn/
├── src/
│   ├── extension.ts        # 扩展入口和命令处理
│   └── modelProvider.ts    # AI模型API调用
├── package.json           # 扩展配置
├── tsconfig.json          # TypeScript配置
└── README.md             # 说明文档
```

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

感谢以下项目和服务：
- [阿里云通义千问](https://tongyi.aliyun.com/)
- [百川智能](https://www.baichuan-ai.com/)
- [智谱AI](https://www.zhipuai.cn/)
- [VSCode Extension API](https://code.visualstudio.com/api)

## ❓ 常见问题

### 如何切换模型？

在VSCode设置中修改 `copilotChatCN.model` 的值，可选 `qwen`、`baichuan` 或 `chatglm`。

### API密钥是否安全？

API密钥存储在本地VSCode设置中，不会上传到任何服务器。请妥善保管您的密钥，避免提交到代码仓库。

### 如何使用自定义模型？

设置 `copilotChatCN.apiEndpoint` 为您的自定义API端点，并设置 `copilotChatCN.modelName` 为对应的模型名称。

### 支持流式响应吗？

当前版本暂不支持流式响应，未来版本会添加此功能。

### 出现API错误怎么办？

1. 检查API密钥是否正确
2. 检查网络连接
3. 确认API余额是否充足
4. 查看错误消息了解具体问题

## 📮 联系方式

如有问题或建议，请：
- 提交 [GitHub Issue](https://github.com/fucheng830/vscode-copilot-chat-cn/issues)
- 发送邮件至项目维护者

---

**注意**：使用本扩展需要自行申请对应模型的API密钥，产生的API调用费用由用户承担。