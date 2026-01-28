# Lead Management System

Full-stack lead capture and management platform with automated follow-ups.

## 🎯 Features
- **Lead Form**: Public-facing form with validation
- **Admin Dashboard**: Manage leads, update status, analytics
- **Automation**: Auto-emails via n8n + Resend
- **Storage**: Google Sheets integration

## 🏗️ Architecture
[Diagram showing Form → n8n → Sheets → Dashboard]

## 🚀 Quick Start

### Lead Form
\`\`\`bash
cd lead-form
npm install
npm run dev
\`\`\`

### Dashboard
\`\`\`bash
cd dashboard
npm install
npm run dev
\`\`\`

### n8n Setup
See [n8n-workflows/README.md](n8n-workflows/README.md)

## 🛠️ Tech Stack
- React + Vite
- Tailwind CSS
- n8n (automation)
- Resend (emails)
- Google Sheets (database)

## 📦 Deployment
- Form: Vercel
- Dashboard: Vercel (password protected)
- n8n: Self-hosted

## 📸 Screenshots
[Add screenshots here]
