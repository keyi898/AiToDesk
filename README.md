# aitodesk
![GitHub License](https://img.shields.io/github/license/keyi898/AiToDesk)
![GitHub Release](https://img.shields.io/github/v/release/keyi898/AiToDesk)
![GitHub stars](https://img.shields.io/github/stars/keyi898/AiToDesk?style=social)
![GitHub forks](https://img.shields.io/github/forks/keyi898/AiToDesk?style=social)
![GitHub issues](https://img.shields.io/github/issues/keyi898/AiToDesk)
![GitHub last commit](https://img.shields.io/github/last-commit/keyi898/AiToDesk)
![GitHub all releases](https://img.shields.io/github/downloads/keyi898/AiToDesk/total)
![Docker Pulls](https://img.shields.io/docker/pulls/keyi898/AiToDesk)


[简体中文](README.zh_cn.md) | [Official Website](https://www.aitodesk.com/) | [Documentation](https://docs.aitodesk.com/)

aitodesk是一款简单好用的AI助手，支持知识库、模型API、分享、联网搜索、智能体，它还在飞快成长中。

aitodesk is an easy-to-use AI assistant that supports knowledge bases, model APIs, sharing, web search, and intelligent agents. It's rapidly growing and improving.

## 🚀 One-sentence Introduction  

A user-friendly AI assistant software that supports local AI models, APIs, and knowledge base setup.

## ✅ Core Features  

- One-click deployment of local AI models and mainstream model APIs
![Local model](.github/assets/img/1_en.png)
- Local knowledge base
![Knowledge base](.github/assets/img/3_en.png)
- Intelligent agent creation
![Intelligent agent](.github/assets/img/4_en.png)
  
- Can be shared online for others to use
![Sharing](.github/assets/img/5_en.png)

- Supports web search
![Web search](.github/assets/img/6_en.png)

- Supports server-side deployment 

- MCP Client
![MCP Client](.github/assets/img/7_en.png)

- Simultaneous conversations with multiple models in a single session (coming soon)  

## ✨ Product Highlights  
- Simple and easy to use, beginner-friendly for AI newcomers  

## 📥 Quick Installation

### Client Version（MacOS, Windows） 

- [Download from official website](https://www.aitodesk.com/)   
- [Download from CNB](https://cnb.cool/keyi898/AiToDesk/-/releases/)  
- [Download from Github](https://github.com/keyi898/AiToDesk/releases)  

### Server Version

#### Docker Run
```bash 
docker run -d \
  --name node \
  -v $(pwd)/data:/data \
  -v $(pwd)/uploads:/uploads \
  -v $(pwd)/logs:/logs \
  -v $(pwd)/bin:/aitodesk/bin \
  -v $(pwd)/sys_data:/sys_data \
  -p 7071:7071 \
  -w /aitodesk \
  keyi898/AiToDesk
```

#### Docker Compose
```bash
mkdir -p aitodesk
cd aitodesk
wget https://cnb.cool/keyi898/AiToDesk/-/git/raw/server/docker-compose.yml
# Run
docker compose up -d
# or
docker-compose up -d
``` 
## Build
```bash
git clone https://github.com/keyi898/AiToDesk.git
cd aitodesk
# For macOS users, please remove the `@rollup/rollup-win32-x64-msvc` dependency in [package.json](http://_vscodecontentref_/0)
cd frontend
yarn
cd ..
yarn
yarn dev
```

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=keyi898/AiToDesk&type=Date)](https://www.star-history.com/#keyi898/AiToDesk&Date)

## Sponsor
- CDN acceleration and security protection for this project are sponsored by Tencent EdgeOne.
[![image](https://github.com/user-attachments/assets/0af60c97-9951-4acf-9cf4-f30ae7f25101)](https://edgeone.ai/?from=github)
