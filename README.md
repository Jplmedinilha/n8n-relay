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
