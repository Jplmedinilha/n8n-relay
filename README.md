# Secure Webhook Bridge (Node.js + TypeScript)

This project provides a lightweight and secure HTTP API designed to act as a **bridge between an exposed server (e.g., Oracle Cloud) and an on-premise n8n instance**.

Because on-premise n8n cannot directly receive incoming webhooks from the public internet, this bridge solves the problem by receiving external triggers and then forwarding them to your private n8n environment in a controlled and safe way.

---

## ✨ Features

- 🚀 **Simple TypeScript API** using Express
- 🔐 **Token-protected endpoint** (via `x-api-token` header)
- 🛡️ **No need to expose n8n** to the internet
- 📦 **Lightweight Docker image** (Node 18 Alpine)
- 🌐 **Can run anywhere** — OCI VM, AWS EC2, VPS, or your own machine
- 🔁 **Perfect for webhook providers** such as Telegram, Slack, Stripe, GitHub, etc.

---

## 📂 Project Structure

.
├── src/
│ └── index.ts
├── dist/
├── package.json
├── tsconfig.json
├── Dockerfile
└── .env

---

## 🔧 Configuration

Create a `.env` file:

```env
SECURITY_TOKEN=your-secret-token-here
N8N_WEBHOOK_URL=http://your-onprem-n8n/api/webhook
```

Environment variables:

Variable Description
SECURITY_TOKEN Used to authenticate requests sent to /trigger
N8N_WEBHOOK_URL Private n8n endpoint that will receive forwarded events

▶️ Running Locally

Install dependencies:

npm install

Start in development mode:

npm run dev

Build:

npm run build

Start compiled version:

node dist/index.js

🐳 Running with Docker

Build the image:

docker build -t secure-webhook-bridge .

Run:

docker run -p 3000:3000 \
 -e SECURITY_TOKEN=your-token \
 -e N8N_WEBHOOK_URL=http://n8n.local/webhook \
 secure-webhook-bridge

📡 API
POST /trigger

Used by your exposed server or external services to send events.

Headers:
x-api-token: <SECURITY_TOKEN>
Content-Type: application/json

Body example:
{
"event": "newMessage",
"user": "John Doe",
"data": { "text": "Hello world" }
}

Response:
{
"ok": true
}

🔁 How It Works

Your OCI VM exposes this small API publicly.

External services send data to /trigger.

Your API validates the x-api-token.

If valid, the API forwards the data to your on-premise n8n webhook URL.

n8n continues the workflow inside your private network.

This keeps your n8n completely offline and safe, while still supporting external events.

🛡️ Security Notes

Always set a strong SECURITY_TOKEN

Never expose your n8n instance directly

Use HTTPS on your public server

Rotate tokens periodically

Dockerfile only installs production dependencies

📜 License

MIT — free to use, modify, and share.

🤝 Contributing

Pull requests and improvements are welcome!
