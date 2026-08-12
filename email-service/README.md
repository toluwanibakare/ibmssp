# 📧 IBMSSP Dedicated Email Microservice

A standalone Node.js + Express microservice for handling **all** email operations for IBMSSP:
- 🔑 OTP Password Reset sending & verification
- 🎓 Member Registration Welcome Emails
- 💳 Payment Receipts & Certificate Downloads
- 📢 Broadcast Newsletters & Announcements

---

## 🚀 Quick Start (Local Development)

1. Open terminal inside `email-service`:
   ```bash
   cd email-service
   npm install
   ```

2. Copy `.env.example` to `.env` and enter your webmail password:
   ```bash
   cp .env.example .env
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

Server will run at `http://localhost:5000`.

---

## 🌐 Deployment Options

### Option A: Deployment directly on cPanel (Recommended - 100% free & local to webmail)
1. In cPanel, search for **"Setup Node.js App"**.
2. Click **Create Application**.
3. Choose Node.js version `18.x` or `20.x`.
4. Set Application Root to `email-service`.
5. Application URL: `api-email.ibmssp.org.ng` (or subfolder).
6. Set Environment Variables (`SMTP_PASS`, `SMTP_USER`, etc.).
7. Click **Run npm install** and then **Start Application**.

### Option B: Deploy to Render.com (Free)
1. Connect this GitHub repository to Render.com.
2. Select **Web Service**, set Root Directory to `email-service`.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add Environment Variable: `SMTP_PASS = your_webmail_password`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Service status check |
| `POST` | `/api/send-otp` | Send 6-digit OTP email |
| `POST` | `/api/verify-otp` | Verify OTP code |
| `POST` | `/api/send-welcome` | Send member registration welcome email |
| `POST` | `/api/send-payment` | Send payment confirmation email |
| `POST` | `/api/send-email` | Universal routing endpoint for all email types |
