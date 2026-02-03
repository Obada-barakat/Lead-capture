# 📊 Lead Management Dashboard

Admin dashboard for viewing, filtering, and managing captured leads with real-time updates.

## 🎨 Features

- ✅ Real-time lead viewing
- ✅ Advanced search and filtering
- ✅ Status management (new, contacted, converted)
- ✅ Analytics cards (total, daily, conversion rate)
- ✅ Optimistic UI updates
- ✅ Password protection
- ✅ Auto-refresh on window focus
- ✅ Manual refresh button
- ✅ Mobile responsive
- ✅ Glassmorphism design

## 🚀 Quick Start

### Install Dependencies
```bash
cd dashboard
npm install
```

### Configure Environment


### Run Development Server
```bash
npm run dev
```

Open `http://localhost:5173`

**Default password:** `admin123` (change this!)

## 🔐 Authentication

### Change Password

In `src/context/AuthContext.jsx`:
```javascript
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
```

Set `VITE_ADMIN_PASSWORD` in `.env` file.

### Session Management

- Uses `sessionStorage` (clears on browser close)
- Login persists during browser session
- Logout clears session immediately

### Add Multiple Users

Modify `AuthContext.jsx`:
```javascript
const ADMIN_USERS = {
  'admin@example.com': 'password123',
  'manager@example.com': 'manager456',
};

const login = (email, password) => {
  if (ADMIN_USERS[email] === password) {
    // ... login logic
  }
};
```

## 🔧 Configuration

### API Endpoints

In `src/services/api.js`:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5678/webhook';

export const leadsAPI = {
  getLeads: async () => {
    const response = await fetch(`${API_BASE_URL}/get-leads`);
    // ...
  },
  updateLeadStatus: async ({ email, status }) => {
    const response = await fetch(`${API_BASE_URL}/update-lead-status`, {
      // ...
    });
  },
};
```

### TanStack Query Settings

In `src/main.jsx`:
```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,        // 5 minutes
      refetchOnWindowFocus: true,       // Auto-refresh
      retry: 2,                          // Retry failed requests
    },
  },
});
```

## 📊 Components

### Dashboard.jsx
Main container with TanStack Query hooks, handles data fetching and mutations.

### LeadsTable.jsx
Displays leads in table format with search, filter, and status update dropdown.

### AnalyticsCards.jsx
Shows total leads, today's leads, and conversion rate.

### StatusBadge.jsx
Reusable colored status pill component.

### Login.jsx
Password-protected login screen.

### ProtectedRoute.jsx
HOC that protects routes requiring authentication.

## 🎨 Customization

### Change Status Options

In `LeadsTable.jsx`:
```javascript
{['new', 'contacted', 'converted', 'lost'].map(status => (
  <button onClick={() => handleStatusUpdate(lead, status)}>
    {status}
  </button>
))}
```

### Add New Analytics

In `AnalyticsCards.jsx`:
```javascript
const newMetric = leads.filter(lead => /* your logic */).length;

const cards = [
  // ... existing cards
  {
    title: 'New Metric',
    value: newMetric,
    icon: YourIcon,
    color: 'from-color to-color'
  }
];
```

### Customize Colors

Change gradient in components:
```jsx
<div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
```

## 📦 Build for Production
```bash
npm run build
```

Output in `dist/` folder.

## 🚢 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel dashboard:
- `VITE_ADMIN_PASSWORD`
- `VITE_GET_LEADS_URL`
- `VITE_UPDATE_STATUS_URL`

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

Add environment variables in Netlify settings.

### Important: Production URLs

Update API URLs to production n8n instance:
```env
VITE_GET_LEADS_URL=https://your-n8n-production.com/webhook/get-leads
VITE_UPDATE_STATUS_URL=https://your-n8n-production.com/webhook/update-lead-status
```

## 🧪 Testing

### Test Authentication
1. Visit dashboard → Should show login
2. Enter wrong password → Should show error
3. Enter correct password → Should show dashboard
4. Click logout → Should return to login

### Test Lead Management
1. Login to dashboard
2. Verify leads display from Google Sheets
3. Use search → Should filter results
4. Change status filter → Should update table
5. Update lead status → Should update immediately
6. Refresh → Should maintain updates

### Test Analytics
1. Check total leads count
2. Add a lead today → Count should update
3. Mark lead as converted → Conversion rate updates

## 🐛 Troubleshooting

### Can't login
- Check password in `.env` or `AuthContext.jsx`
- Clear sessionStorage: `sessionStorage.clear()`
- Check browser console for errors

### Leads not loading
- Verify n8n workflow is active
- Check API URL in `.env`
- Check n8n webhook returns correct JSON format
- Open Network tab to see API response

### Status updates not working
- Check update webhook URL
- Verify n8n update workflow is active
- Check Google Sheets has "Status" column
- Look for errors in browser console

### Styling issues
- Ensure Tailwind is configured
- Run `npm install -D tailwindcss postcss autoprefixer`
- Check `tailwind.config.js` content paths

## 📞 Support

Issues? Check the main [README](../README.md) or open an issue.
