# Ollama 安装包

将 Ollama 安装包放入此目录，即可在打包时自动集成到 AiToDesk 安装包中。

## 支持的文件

| 平台 | 文件名 | 说明 |
|------|--------|------|
| Windows | `OllamaSetup.exe` | Ollama for Windows 安装程序 |
| macOS | `Ollama-darwin.zip` | Ollama for macOS |
| Linux | `ollama-linux-amd64.tgz` | Ollama for Linux amd64 |

## 如何下载

运行以下命令自动下载最新版：

```bash
# Windows
curl -L -o build/extraResources/ollama/OllamaSetup.exe https://github.com/ollama/ollama/releases/latest/download/OllamaSetup.exe

# macOS  
curl -L -o build/extraResources/ollama/Ollama-darwin.zip https://github.com/ollama/ollama/releases/latest/download/Ollama-darwin.zip

# 或者使用下载脚本
node scripts/download-ollama.js
```

## 工作原理

如果此目录中存在对应平台的安装包，AiToDesk 会使用内置版本（无需下载）。
如果不存在，则自动从 GitHub Releases 下载（需要网络连接）。
