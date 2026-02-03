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

---

## 🚀 Quick Start

### Install Dependencies
```bash
cd dashboard
npm install
```

### Run Development Server
```bash
npm run dev
```

Open `http://localhost:5173`

**Default password:** `Admin@0022`

---

## 🔧 Configuration

### Change Admin Password

**File:** `src/context/AuthContext.jsx`

Line 5:
```javascript
const ADMIN_PASSWORD = 'Admin@0022'; // Change this to a secure password!
```

⚠️ **Important:** Change this before deploying to production!

### Update API Endpoints

**File:** `src/services/api.js`

Line 2:
```javascript
const API_BASE_URL = 'http://localhost:5678/webhook';
```

Change to your n8n instance URL:
```javascript
// For production
const API_BASE_URL = 'https://your-n8n-instance.com/webhook';
```

The dashboard will call:
- `${API_BASE_URL}/get-leads` - Fetch all leads
- `${API_BASE_URL}/update-lead-status` - Update lead status

---

## 🔐 Authentication

### How It Works

- Uses `sessionStorage` (clears when browser closes)
- Login persists during browser session
- Logout clears session immediately
- No user registration needed

### Session Management

**Current behavior (session only):**
```javascript
// In AuthContext.jsx
sessionStorage.setItem('isAuthenticated', 'true');
```

**For persistent login (across browser restarts):**
```javascript
// Change to localStorage
localStorage.setItem('isAuthenticated', 'true');
```

### Add Multiple Users

To support multiple users, edit `AuthContext.jsx`:
```javascript
const ADMIN_USERS = {
  'admin@example.com': 'password123',
  'manager@example.com': 'manager456',
};

const login = (email, password) => {
  if (ADMIN_USERS[email] === password) {
    setIsAuthenticated(true);
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('userEmail', email);
    return true;
  }
  return false;
};
```

Then update `Login.jsx` to include email field.

---

## 🎨 Customization

### Add New Status Options

**File:** `src/components/LeadsTable.jsx`

Find the status dropdown (around line 180):
```javascript
{['new', 'contacted', 'converted'].map(status => (
  <button onClick={() => handleStatusUpdate(lead, status)}>
    {status}
  </button>
))}
```

Add your custom statuses:
```javascript
{['new', 'contacted', 'converted', 'lost', 'follow-up'].map(status => (
  <button onClick={() => handleStatusUpdate(lead, status)}>
    {status}
  </button>
))}
```

### Customize Status Colors

**File:** `src/components/StatusBadge.jsx`

Add new status colors:
```javascript
const getStatusStyles = () => {
  switch (status?.toLowerCase()) {
    case 'new':
      return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
    case 'contacted':
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
    case 'converted':
      return 'bg-green-500/20 text-green-300 border-green-400/30';
    case 'lost':
      return 'bg-red-500/20 text-red-300 border-red-400/30';
    default:
      return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
  }
};
```

### Add New Analytics Card

**File:** `src/components/AnalyticsCards.jsx`

Add your custom metric:
```javascript
// Calculate custom metric
const customMetric = leads.filter(lead => 
  // Your logic here
  lead.status === 'contacted'
).length;

const cards = [
  // ... existing cards
  {
    title: 'Contacted Leads',
    value: customMetric,
    icon: Phone,
    color: 'from-yellow-500 to-yellow-600'
  }
];
```

### Change Color Scheme

Update gradient in `Dashboard.jsx`:
```jsx
<div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
```

Change to your colors:
```jsx
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
```

---

## 📊 Components Overview

### Dashboard.jsx
- Main container component
- Handles data fetching with TanStack Query
- Manages mutations for status updates
- Provides data to child components

### LeadsTable.jsx
- Displays leads in table format
- Implements search functionality
- Handles status filtering
- Manages status update dropdown

### AnalyticsCards.jsx
- Calculates and displays metrics
- Shows total leads, today's leads, conversion rate
- Automatically updates when data changes

### StatusBadge.jsx
- Reusable colored status pill
- Dynamic styling based on status value

### Login.jsx
- Password-protected login screen
- Shows/hide password toggle
- Error handling

### ProtectedRoute.jsx
- Higher-order component for route protection
- Redirects to login if not authenticated

---

## 📦 Build for Production
```bash
npm run build
```

Output will be in the `dist/` folder.

---

## 🚢 Deployment

### Before Deploying

**⚠️ Update these files:**

1. **Change password** in `src/context/AuthContext.jsx`
2. **Update API URL** in `src/services/api.js`

### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Build and deploy
cd dashboard
npm run build
vercel --prod
```

### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
cd dashboard
npm run build
netlify deploy --prod --dir=dist
```

### Important: Production URLs

Make sure your n8n instance is publicly accessible and update the URL:
```javascript
// src/services/api.js
const API_BASE_URL = 'https://your-production-n8n.com/webhook';
```

---

## 🧪 Testing

### Test Authentication
1. Open dashboard → Should show login screen
2. Enter wrong password → Should show error message
3. Enter correct password → Should redirect to dashboard
4. Click logout → Should return to login
5. Close browser and reopen → Should show login (session cleared)

### Test Lead Management
1. Login to dashboard
2. Verify leads display from Google Sheets
3. Test search: Type in search box → Table filters
4. Test filter: Change status dropdown → Table updates
5. Update status: Click "Update" → Select new status → Check Google Sheets
6. Manual refresh: Click refresh button → Data reloads

### Test Analytics
1. Check total leads matches table count
2. Add a lead with today's date → "Today's Leads" increments
3. Mark a lead as "converted" → Conversion rate updates

---

## 🐛 Troubleshooting

### Can't Login

**Wrong password:**
- Check `src/context/AuthContext.jsx` line 5
- Make sure you're entering the exact password

**Clear session:**
```javascript
// In browser console (F12)
sessionStorage.clear();
location.reload();
```

### Leads Not Loading

**Check API URL:**
```javascript
// src/services/api.js should have correct URL
const API_BASE_URL = 'http://localhost:5678/webhook';
```

**Verify n8n:**
- Is n8n running?
- Is get-leads workflow activated?
- Test manually: `curl http://localhost:5678/webhook/get-leads`

**Check browser console:**
- Press F12 → Network tab
- Look for failed requests
- Check response data

### Status Updates Not Working

**Check update URL:**
```javascript
// src/services/api.js
updateLeadStatus: async ({ email, status }) => {
  const response = await fetch(`${API_BASE_URL}/update-lead-status`, {
```

**Verify n8n workflow:**
- Is update-lead-status workflow activated?
- Check Google Sheets has "Status" column
- Test manually with curl

**Check execution logs:**
- Open n8n → Executions
- Look for failed update attempts

### CORS Errors

If you see CORS errors in the console:

**In n8n webhook nodes:**
1. Open Webhook node
2. Under Options → Response Headers:
   - Name: `Access-Control-Allow-Origin`
   - Value: Your dashboard URL or `*` for testing

### TanStack Query Issues

**Data not refetching:**
- Check `staleTime` in `src/main.jsx`
- Try manual refresh button
- Clear browser cache

**Mutations failing:**
- Check Network tab for error response
- Verify payload format matches n8n expectations
- Check onError handler in Dashboard.jsx

### Styling Issues

**Tailwind not working:**
```bash
# Reinstall
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Check configuration:**
```javascript
// tailwind.config.js
content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
],
```
```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🔐 Security Best Practices

### For Production

**Current setup is suitable for:**
- Portfolio demonstrations
- Internal tools
- Small teams
- Learning projects

**For public production apps, implement:**

1. **Proper Authentication**
   - Use Firebase Auth, Auth0, or Supabase
   - Implement JWT tokens
   - Add password reset functionality

2. **Secure Password Storage**
   - Hash passwords (bcrypt)
   - Use environment variables
   - Never commit passwords to git

3. **API Security**
   - Add authentication to n8n webhooks
   - Implement rate limiting
   - Use HTTPS only
   - Add CORS whitelist

4. **Session Security**
   - Use secure cookies
   - Implement CSRF protection
   - Add session timeout

---

## 📞 Support

For issues or questions:
- Check the main [README](../README.md)
- Open an issue on GitHub
- Review TanStack Query documentation
