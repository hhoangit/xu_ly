<div align="center">
<h1>QuickLedger AI API</h1>
</div>

# Run and deploy your API locally

This repository contains the backend API for the QuickLedger AI service. It uses Node.js, Express, and Google's Gemini GenAI SDK to automatically extract and parse transaction data from natural language text.

## Run Locally

**Prerequisites:**  Node.js (v22+) or Docker

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root directory and set your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

### Running the Application

You can start the Node.js API server natively or by using Docker.

**Option 1: Run with Node (Development)**
```bash
# Starts the server using tsx watch to hot-reload on changes
npm run dev
```

**Option 2: Run with Docker**

Build the Docker image:
```bash
docker build -t quickledger-ai .
```

Run the Docker Container:
```bash
docker run -p 3001:3001 --env-file .env.local quickledger-ai
```
*(Note: If you already have a service running on port 3001 locally, map it to a different port like `3002:3001`)*

### API Endpoints

Once the server is running (defaults to `http://localhost:3001`), you can interact with these endpoints:

- `GET /health` - Health check endpoint
- `POST /api/extract` - Extract transaction data from text utilizing Gemini AI
  - Request body: `{ "text": "Khách hàng Nguyễn Văn A, địa chỉ 123 Đường ABC, hợp đồng HD001, thanh toán lần 1 số tiền 5000000 bằng tiền mặt. Ghi chú: CỌC VÁY" }`
  - Response: `{ "transactions": [{ "customerName": "Nguyễn Văn A", "amount": 5000000, ... }] }`

You can use the included `test-api.sh` script to verify your setup using `curl`.
