/**
 * 下载 Ollama 安装包到 build/extraResources/ollama/
 * 在打包前运行此脚本，即可将 Ollama 内置到 AiToDesk 安装包中
 * 
 * 用法: node scripts/download-ollama.js [platform]
 *  platform: windows (默认), mac, linux, all
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://github.com/ollama/ollama/releases/latest/download';
const FILES = {
  windows: { url: `${BASE_URL}/OllamaSetup.exe`, filename: 'OllamaSetup.exe' },
  mac: { url: `${BASE_URL}/Ollama-darwin.zip`, filename: 'Ollama-darwin.zip' },
  linux: { url: `${BASE_URL}/ollama-linux-amd64.tgz`, filename: 'ollama-linux-amd64.tgz' },
};

const TARGET_DIR = path.resolve(__dirname, '..', 'build', 'extraResources', 'ollama');

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    console.log(`⬇️  下载 ${url}`);
    console.log(`  → ${dest}`);

    https.get(url, { headers: { 'User-Agent': 'AiToDesk-Build' } }, (response) => {
      // 处理重定向
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        console.log(`  ↪ 重定向到 ${response.headers.location}`);
        file.close();
        fs.unlinkSync(dest);
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      const total = parseInt(response.headers['content-length'] || '0', 10);
      let downloaded = 0;
      let lastLog = 0;

      response.on('data', (chunk) => {
        downloaded += chunk.length;
        if (total > 0 && Date.now() - lastLog > 5000) {
          const pct = (downloaded / total * 100).toFixed(1);
          process.stdout.write(`\r  📊 ${(downloaded/1024/1024).toFixed(1)}MB / ${(total/1024/1024).toFixed(1)}MB (${pct}%)`);
          lastLog = Date.now();
        }
      });

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        const size = fs.statSync(dest).size;
        console.log(`\r  ✅ 下载完成: ${(size/1024/1024).toFixed(1)}MB`);
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function main() {
  const platform = process.argv[2] || 'windows';

  // 确保目标目录存在
  fs.mkdirSync(TARGET_DIR, { recursive: true });

  const platforms = platform === 'all' ? Object.keys(FILES) : [platform];

  for (const p of platforms) {
    const { url, filename } = FILES[p];
    const dest = path.join(TARGET_DIR, filename);

    if (fs.existsSync(dest)) {
      const size = fs.statSync(dest).size;
      console.log(`⏭️  跳过 ${filename} (已存在, ${(size/1024/1024).toFixed(1)}MB)`);
      continue;
    }

    try {
      await downloadFile(url, dest);
    } catch (err) {
      console.error(`❌ ${filename} 下载失败:`, err.message);
    }
  }

  console.log('\n📋 目录内容:');
  const files = fs.readdirSync(TARGET_DIR);
  for (const f of files) {
    const stat = fs.statSync(path.join(TARGET_DIR, f));
    if (stat.isFile() && f !== 'README.md') {
      console.log(`  ${f.padEnd(30)} ${(stat.size/1024/1024).toFixed(1)}MB`);
    }
  }
}

main().catch(console.error);
