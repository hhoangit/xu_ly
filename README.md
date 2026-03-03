<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1-nlR3OCn46GBJZJn2r1qBz11oPHKC36R

## Run Locally

**Prerequisites:**  Node.js

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root directory and set your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

### Running the Application

You have two options:

**Option 1: Run both frontend and backend together (Recommended)**
```bash
npm run dev:all
```
This will start:
- API server on `http://localhost:3001`
- Frontend on `http://localhost:3000`

**Option 2: Run separately**

Terminal 1 - Start the API server:
```bash
npm run dev:server
```

Terminal 2 - Start the frontend:
```bash
npm run dev
```

### API Endpoints

- `GET /health` - Health check endpoint
- `POST /api/extract` - Extract transaction data from text
  - Request body: `{ "text": "your transaction text here" }`
  - Response: `{ "transactions": [...] }`
