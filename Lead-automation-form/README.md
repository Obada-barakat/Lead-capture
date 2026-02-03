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

## 🚀 Quick Start

### Install Dependencies
```bash
cd lead-form
npm install
```

### Configure Environment

Create `.env` file:
```env
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/lead-capture
```

### Run Development Server
```bash
npm run dev
```

Open `http://localhost:5173`

## 🔧 Configuration

### Update Webhook URL

In `src/components/LeadCaptureForm.jsx`, update:
```javascript
const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() })
});
```

### Customize Fields

Add/remove fields in the form by editing the `formData` state:
```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  // Add your custom fields here
});
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
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

## 🎨 Styling

Using **Tailwind CSS** with glassmorphism design.

### Color Scheme
- Background: Purple to Blue gradient
- Glass effect: `bg-white/10` with `backdrop-blur-lg`
- Borders: `border-white/20`

### Customize Colors

In component, change gradient:
```jsx
<div className="bg-gradient-to-br from-YOUR-COLOR via-YOUR-COLOR to-YOUR-COLOR">
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

### Netlify
```bash
npm run build
# Drag dist/ folder to Netlify
```

### Set Environment Variables

In deployment platform, add:
- `VITE_N8N_WEBHOOK_URL`

## 🔌 Embedding

### As Iframe
```html
<iframe 
  src="https://your-deployed-form.vercel.app" 
  width="100%" 
  height="800px" 
  frameborder="0"
></iframe>
```

### As Component

Copy `src/components/LeadCaptureForm.jsx` to your project.

## 🧪 Testing

Test the form:
1. Fill all required fields
2. Submit with invalid email → Should show error
3. Submit with valid data → Should show success message
4. Check n8n workflow received data

## 📝 Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | text | ✅ Yes | Not empty |
| Email | email | ✅ Yes | Valid email format |
| Phone | tel | ❌ No | 10+ digits with +/- allowed |
| Company | text | ❌ No | None |
| Message | textarea | ❌ No | None |

## 🐛 Troubleshooting

### Form not submitting
- Check n8n webhook URL is correct
- Check n8n workflow is activated
- Check browser console for errors
- Verify CORS is configured in n8n

### Validation not working
- Check `validateForm` function
- Ensure error messages display
- Test with console.log

### Styling issues
- Ensure Tailwind CSS is configured
- Check `tailwind.config.js` includes src files
- Verify `@tailwind` directives in index.css

## 📞 Support

Issues? Check the main [README](../README.md) or open an issue.
