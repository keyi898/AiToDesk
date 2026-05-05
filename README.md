# aitodesk
![GitHub License](https://img.shields.io/github/license/keyi898/aitodesk)
![GitHub Release](https://img.shields.io/github/v/release/keyi898/aitodesk)
![GitHub stars](https://img.shields.io/github/stars/keyi898/aitodesk?style=social)
![GitHub forks](https://img.shields.io/github/forks/keyi898/aitodesk?style=social)
![GitHub issues](https://img.shields.io/github/issues/keyi898/aitodesk)
![GitHub last commit](https://img.shields.io/github/last-commit/keyi898/aitodesk)
![GitHub all releases](https://img.shields.io/github/downloads/keyi898/aitodesk/total)
![Docker Pulls](https://img.shields.io/docker/pulls/keyi898/aitodesk)


aitodesk是一款简单好用的AI助手，支持知识库、模型API、分享、联网搜索、智能体，它还在飞快成长中。

aitodesk is an easy-to-use AI assistant that supports knowledge bases, model APIs, sharing, web search, and intelligent agents. It's rapidly growing and improving.

## 🚀 One-sentence Introduction  

A user-friendly AI assistant software that supports local AI models, APIs, and knowledge base setup.

## ✅ Core Features  

- One-click deployment of local AI models and mainstream model APIs
- Local knowledge base
- Intelligent agent creation
  
- Can be shared online for others to use

- Supports web search

- Supports server-side deployment 

- MCP Client

- Simultaneous conversations with multiple models in a single session (coming soon)  

## ✨ Product Highlights  
- Simple and easy to use, beginner-friendly for AI newcomers  

## 📥 Quick Installation

### Client Version（MacOS, Windows） 

- [Download from Github](https://github.com/keyi898/aitodesk/releases)  

### Server Version

#### Docker Run
```bash 
docker run -d \
  --name aitodesk-node \
  -v $(pwd)/data:/data \
  -v $(pwd)/uploads:/uploads \
  -v $(pwd)/logs:/logs \
  -v $(pwd)/bin:/aitodesk/bin \
  -v $(pwd)/sys_data:/sys_data \
  -p 7071:7071 \
  -w /aitodesk \
  keyi898/aitodesk
```

#### Docker Compose
```bash
mkdir -p aitodesk
cd aitodesk
wget https://cnb.cool/keyi898/aitodesk/-/git/raw/server/docker-compose.yml
# Run
docker compose up -d
# or
docker-compose up -d
``` 
## Build
```bash
git clone https://github.com/keyi898/aitodesk.git
cd aitodesk
# For macOS users, please remove the `@rollup/rollup-win32-x64-msvc` dependency in [package.json](http://_vscodecontentref_/0)
cd frontend
yarn
cd ..
yarn
yarn dev
```

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=keyi898/aitodesk&type=Date)](https://www.star-history.com/#keyi898/aitodesk&Date)

## Sponsor
- CDN acceleration and security protection for this project are sponsored by Tencent EdgeOne.
[![image](https://github.com/user-attachments/assets/0af60c97-9951-4acf-9cf4-f30ae7f25101)](https://edgeone.ai/?from=github)
