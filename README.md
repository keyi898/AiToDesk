# aitodesk

A user-friendly AI assistant software.

## Build Instructions

### Prerequisites
- Node.js 20+
- npm

### Quick Start (Development)
```bash
npm install
cd frontend && npm install && cd ..
npm run dev
```

### Build Installer

**Windows:**
```bash
npm install
cd frontend && npm install && cd ..
npm run build-w
```

**macOS:**
```bash
npm install
cd frontend && npm install && cd ..
npm run build-m
```

**Linux:**
```bash
npm install
cd frontend && npm install && cd ..
npm run build-l
```

> **Note:** If you get a blank window after installation, check that `public/dist/index.html` exists.  
> The build script now automatically verifies this and will fail early if the frontend wasn't built correctly.

### CI/CD Builds

Push a tag to trigger automated GitHub Actions build:
```bash
git tag v1.0.0
git push origin v1.0.0
```

Or manually trigger from Actions tab → "Build AiToDesk" → "Run workflow".
