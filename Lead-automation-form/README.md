# 📋 Lead Capture Form

Public-facing lead capture form with real-time validation and n8n webhook integration.

## 🎨 Features

- ✅ Real-time field validation
- ✅ Email format validation
- ✅ Phone number validation
- ✅ Required field indicators
- ✅ Success/error notifications
- ✅ Glassmorphism design
- ✅ Mobile responsive
- ✅ Loading states
- ✅ Auto-clears on success

---

## 🚀 Quick Start

### Install Dependencies
```bash
cd lead-form
npm install
```

### Run Development Server
```bash
npm run dev
```

Open `http://localhost:5173`

---

## 🔧 Configuration

### Update Webhook URL

**File:** `src/components/LeadCaptureForm.jsx`

Find line 55 and update with your n8n webhook URL:
```javascript
// Current (development)
const response = await fetch('http://localhost:5678/webhook/lead-capture', {

// Change to your n8n URL
const response = await fetch('https://your-n8n-instance.com/webhook/lead-capture', {
```

**For production deployment:**
- Development: `http://localhost:5678/webhook/lead-capture`
- Production: `https://your-domain.com/webhook/lead-capture`

---

## 🎨 Customization

### Add/Remove Form Fields

Edit the `formData` state in `LeadCaptureForm.jsx`:
```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  // Add your custom fields here
  customField: '',
});
```

Then add the input field in the JSX:
```jsx
<div>
  <label className="block text-sm font-medium text-blue-100 mb-2">
    Custom Field
  </label>
  <input
    type="text"
    name="customField"
    value={formData.customField}
    onChange={handleChange}
    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg..."
    placeholder="Enter custom field"
  />
</div>
```

### Customize Validation

Edit the `validateForm` function:
```javascript
const validateForm = () => {
  const newErrors = {};
  
  // Add your validation rules
  if (!formData.customField) {
    newErrors.customField = 'This field is required';
  }
  
  // Custom email domain validation
  if (formData.email && !formData.email.endsWith('@company.com')) {
    newErrors.email = 'Must use company email';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

### Change Colors

Update the gradient background:
```jsx
<div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
```

Change to your colors:
```jsx
<div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900">
```

---

## 📦 Build for Production
```bash
npm run build
```

Output will be in the `dist/` folder.

---

## 🚢 Deployment

### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd lead-form
npm run build
vercel --prod
```

### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd lead-form
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
# Build
npm run build

# The dist/ folder contains your static files
# Upload to GitHub Pages or any static host
```

---

## 🔌 Embedding the Form

### As Iframe
```html
<iframe 
  src="https://your-deployed-form.vercel.app" 
  width="100%" 
  height="800px" 
  frameborder="0"
  title="Lead Capture Form"
></iframe>
```

### As Standalone Component

Copy `src/components/LeadCaptureForm.jsx` to your existing React project and import:
```javascript
import LeadCaptureForm from './components/LeadCaptureForm';

function App() {
  return <LeadCaptureForm />;
}
```

---

## 📝 Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | text | ✅ Yes | Not empty |
| Email | email | ✅ Yes | Valid email format |
| Phone | tel | ❌ No | 10+ digits, allows +/- |
| Company | text | ❌ No | None |
| Message | textarea | ❌ No | None |

---

## 🧪 Testing

### Test Validation
1. Submit empty form → Should show "Name is required"
2. Enter invalid email → Should show "Invalid email format"
3. Enter invalid phone → Should show "Invalid phone number"

### Test Submission
1. Fill all required fields correctly
2. Click submit
3. Should show loading spinner
4. Should show success message
5. Form should clear

### Test n8n Integration
1. Submit the form
2. Check n8n execution log
3. Verify email was sent
4. Check Google Sheets for new row

---

## 🐛 Troubleshooting

### Form not submitting

**Check webhook URL:**
```javascript
// Make sure this matches your n8n webhook
const response = await fetch('YOUR_CORRECT_URL', {
```

**Check n8n workflow:**
- Is the workflow activated?
- Is n8n running?
- Check n8n execution logs

**Check browser console:**
- Press F12 → Console tab
- Look for errors

### CORS errors

If you see CORS errors in console:

**In n8n workflow:**
1. Open the Webhook node
2. Add under "Options" → "Response Headers":
   - Name: `Access-Control-Allow-Origin`
   - Value: `*` (for testing) or your domain

### Validation not working

Check the `validateForm` function is being called:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {  // This line
    return;  // Stops if validation fails
  }
  
  // ... rest of submit logic
};
```

### Styling issues

**Make sure Tailwind is configured:**
```bash
# Reinstall if needed
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Check `tailwind.config.js`:**
```javascript
content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
],
```

**Check `src/index.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 📞 Support

For issues or questions:
- Check the main [README](../README.md)
- Open an issue on GitHub
- Review n8n documentation
