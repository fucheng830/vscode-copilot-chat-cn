# 贡献指南

感谢您对 VSCode Copilot Chat CN 项目的关注！我们欢迎所有形式的贡献。

## 如何贡献

### 报告问题

如果您发现了bug或有功能建议：

1. 在 [Issues](https://github.com/fucheng830/vscode-copilot-chat-cn/issues) 中搜索，确保问题未被报告
2. 创建新的 Issue，并提供：
   - 清晰的标题和描述
   - 重现步骤（如果是bug）
   - 预期行为和实际行为
   - VSCode版本、操作系统等环境信息
   - 相关的错误日志或截图

### 提交代码

1. **Fork 本仓库**

2. **克隆您的 Fork**
   ```bash
   git clone https://github.com/your-username/vscode-copilot-chat-cn.git
   cd vscode-copilot-chat-cn
   ```

3. **创建特性分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **安装依赖**
   ```bash
   npm install
   ```

5. **进行修改**
   - 遵循现有代码风格
   - 添加必要的注释
   - 确保代码可以通过 ESLint 检查

6. **测试您的修改**
   ```bash
   npm run compile
   npm run lint
   ```
   - 按 F5 在调试模式下运行扩展
   - 测试所有受影响的功能

7. **提交更改**
   ```bash
   git add .
   git commit -m "feat: 添加新功能的简短描述"
   ```

   提交消息格式：
   - `feat:` 新功能
   - `fix:` 修复bug
   - `docs:` 文档更新
   - `style:` 代码格式调整
   - `refactor:` 代码重构
   - `test:` 测试相关
   - `chore:` 构建/工具相关

8. **推送到您的 Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

9. **创建 Pull Request**
   - 访问原仓库
   - 点击 "New Pull Request"
   - 选择您的分支
   - 填写 PR 描述，说明：
     - 改动内容
     - 解决的问题
     - 测试方法

## 开发指南

### 项目结构

```
vscode-copilot-chat-cn/
├── src/                    # 源代码
│   ├── extension.ts       # 扩展入口
│   └── modelProvider.ts   # 模型提供者
├── out/                   # 编译输出（gitignore）
├── resources/             # 资源文件
├── .vscode/              # VSCode配置
├── package.json          # 扩展清单
└── tsconfig.json         # TypeScript配置
```

### 代码规范

- 使用 TypeScript
- 遵循 ESLint 规则
- 使用有意义的变量和函数名
- 添加适当的错误处理
- 编写清晰的注释（中文）

### 调试

1. 在 VSCode 中打开项目
2. 按 F5 启动扩展开发主机
3. 在新窗口中测试扩展
4. 查看调试控制台的日志

### 添加新模型支持

如果要添加新的AI模型：

1. 在 `package.json` 的 `copilotChatCN.model` 枚举中添加模型名称
2. 在 `ModelProvider` 类中添加：
   - 默认API端点
   - 默认模型名称
   - API调用方法
3. 更新 README 文档
4. 更新 CHANGELOG

### 测试清单

在提交PR前，请确保：

- [ ] 代码编译无错误
- [ ] ESLint 检查通过
- [ ] 扩展可以正常加载
- [ ] 所有功能正常工作
- [ ] 更新了相关文档
- [ ] 添加了 CHANGELOG 条目

## 行为准则

- 尊重所有贡献者
- 使用友好和包容的语言
- 接受建设性的批评
- 关注对社区最有利的事情

## 许可证

提交贡献即表示您同意您的代码将在 MIT 许可证下发布。

## 需要帮助？

如果您有任何问题：

- 查看 [README](README.md)
- 查看现有的 [Issues](https://github.com/fucheng830/vscode-copilot-chat-cn/issues)
- 创建新的 Issue 寻求帮助

感谢您的贡献！🎉
