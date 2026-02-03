# 🚀 Lead Management System

A full-stack lead capture and management platform with automated follow-ups, built with React, n8n, and Google Sheets.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2-61dafb.svg)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.0-ff4154.svg)
![n8n](https://img.shields.io/badge/n8n-automation-ea4b71.svg)

## 🎯 Overview

This project demonstrates a complete lead management workflow:
- **Public-facing form** for lead capture with validation
- **Automated workflows** for email notifications and data storage
- **Admin dashboard** for lead management with real-time updates
- **Password-protected** interface with authentication

Perfect for freelancers, small businesses, or anyone needing a simple CRM solution.

---

## ✨ Features

### Lead Capture Form
- ✅ Real-time validation (email, phone, required fields)
- ✅ Glassmorphism design with smooth animations
- ✅ Mobile-responsive
- ✅ Success/error state handling
- ✅ Webhook integration with n8n

### Automation (n8n)
- ✅ Automatic email confirmation to leads
- ✅ Internal team notifications
- ✅ Google Sheets integration for data storage
- ✅ Status tracking (new, contacted, converted)

### Admin Dashboard
- ✅ Real-time lead viewing and management
- ✅ Advanced filtering and search
- ✅ Status updates with optimistic UI
- ✅ Analytics (total leads, conversion rate, daily stats)
- ✅ Password protection
- ✅ Auto-refresh and manual refresh options

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + Vite
- TanStack Query (React Query) for data fetching
- Tailwind CSS for styling
- Lucide React for icons

**Automation & Backend**
- n8n (self-hosted workflows)
- Google Sheets (database)
- Resend (email delivery)

**Authentication**
- React Context API
- Session-based auth

---

## 📁 Project Structure
```
lead-management-system/
├── lead-form/              # Public-facing lead capture form
├── dashboard/              # Admin dashboard for lead management
├── n8n-workflows/          # Exportable n8n workflow JSONs
├── docs/                   # Additional documentation
└── README.md               # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- n8n instance (self-hosted or cloud)
- Google account (for Sheets)
- Resend account (free tier)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/lead-management-system.git
cd lead-management-system
```

### 2. Set Up Lead Form
```bash
cd lead-form
npm install
npm run dev
```

Open `http://localhost:5173` to see the form.

See [lead-form/README.md](./lead-form/README.md) for detailed setup.

### 3. Set Up n8n Workflows

1. Import workflows from `n8n-workflows/` folder
2. Configure credentials (Google Sheets, Resend)
3. Activate workflows

See [n8n-workflows/README.md](./n8n-workflows/README.md) for step-by-step guide.

### 4. Set Up Dashboard
```bash
cd dashboard
npm install
npm run dev
```

Default password: `Admin@0022` (change this!)

See [dashboard/README.md](./dashboard/README.md) for configuration.

---

## 🎨 Screenshots

### Lead Capture Form
![Lead Form Screenshot](./docs/screenshots/leads-form.jpeg)
*Glassmorphic design with real-time validation*

### Admin Dashboard
![Dashboard Screenshot](./docs/screenshots/leads-dashboard.jpeg)
*Real-time lead management with analytics*

---

## 🔧 Configuration

### Lead Form
Update the webhook URL in `lead-form/src/components/LeadCaptureForm.jsx`:
```javascript
const response = await fetch('http://localhost:5678/webhook/lead-capture', {
  method: 'POST',
  // ...
});
```

Change `http://localhost:5678` to your n8n instance URL.

### Dashboard

Update API endpoints in `dashboard/src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5678/webhook';
```

Change password in `dashboard/src/context/AuthContext.jsx`:
```javascript
const ADMIN_PASSWORD = 'Admin@0022'; // Change this!
```

⚠️ **Security Note:** For production, use environment variables and proper authentication.


**n8n**
- Google Sheets API credentials
- Resend API key
- Webhook URLs

---

## 📊 Data Flow
```
┌─────────────┐
│ Lead visits │
│  website    │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  Fills form &   │
│   submits       │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  n8n Webhook    │
│   receives data │
└──────┬──────────┘
       │
       ├──────────────────────┬──────────────────────┐
       ▼                      ▼                      ▼
┌──────────────┐    ┌──────────────┐      ┌──────────────┐
│ Send email   │    │ Save to      │      │ Notify team  │
│ to lead      │    │ Google Sheets│      │ via email    │
└──────────────┘    └──────┬───────┘      └──────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ Admin views  │
                    │ in Dashboard │
                    └──────────────┘
```

---

## 🚢 Deployment

### Lead Form
Deploy to **Vercel** or **Netlify**:
```bash
cd lead-form
npm run build
# Follow Vercel/Netlify deployment steps
```

### Dashboard
Deploy to **Vercel** (with password protection):
```bash
cd dashboard
npm run build
# Deploy and set VITE_ADMIN_PASSWORD in environment variables
```

### n8n
- **Self-hosted**: Docker or npm installation
- **Cloud**: n8n.cloud (paid)

See [docs/deployment.md](./docs/deployment.md) for detailed guides.

---

## 🔐 Security Notes

**Current Setup:**
- ✅ Good for demos and internal tools
- ✅ Session-based authentication
- ✅ Password protection on dashboard

**For Production:**
- Consider proper authentication (Firebase, Auth0, Supabase)
- Use HTTPS for all endpoints
- Implement rate limiting
- Store passwords securely (environment variables)
- Add CORS configuration

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**
- LinkedIn: [Ubba-Obada](https://www.linkedin.com/in/ubba-obada)
- GitHub: [@Ubba](https://github.com/Obada-barakat)
- Portfolio: [Ubba | Portfolio](https://ubba-portfolio.vercel.app/)

---

## 🙏 Acknowledgments

- [React](https://react.dev/)
- [TanStack Query](https://tanstack.com/query)
- [n8n](https://n8n.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

## 📧 Support

If you have any questions or need help, feel free to:
- Open an issue
- Contact me on LinkedIn
- Email: obada.baracat1@gmail.com

---

**⭐ If you found this project helpful, please give it a star!**
