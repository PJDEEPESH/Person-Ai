# Setup Guide for Person-Ai

## Quick Start

Follow these steps to get Person-Ai running on your machine.

### Step 1: Clone Repository
```bash
git clone https://github.com/PJDEEPESH/Person-Ai.git
cd Person-Ai
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment
```bash
cp .env.example .env
# Edit .env with your API keys and configuration
```

### Step 4: Development
```bash
npm run dev
```

### Step 5: Build
```bash
npm run build
```

## Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm start` - Start production server
- `npm run lint` - Run linter

## Troubleshooting

### Node version issues
Make sure you have Node.js 16+ installed:
```bash
node --version
```

### Dependencies not installing
Try clearing npm cache:
```bash
npm cache clean --force
npm install
```

### Port already in use
Change the port in your .env file or kill the process using the port.

## Docker Setup (Optional)

Build Docker image:
```bash
docker build -t person-ai .
```

Run Docker container:
```bash
docker run -p 3000:3000 person-ai
```

## Need Help?

Check the README.md for more information or open an issue on GitHub.
