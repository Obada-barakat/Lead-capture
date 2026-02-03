# ⚙️ n8n Workflows

Automation workflows for lead capture, storage, and notifications.

## 📦 Included Workflows

1. **lead-capture.json** - Main workflow for form submission
2. **get-leads.json** - API endpoint to fetch all leads
3. **update-lead-status.json** - API endpoint to update lead status

## 🚀 Setup Instructions

### Prerequisites

- n8n instance (self-hosted or cloud)
- Google account with Sheets access
- Resend account (free tier works)

### 1. Install n8n

**Docker (Recommended):**
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

**npm:**
```bash
npm install n8n -g
n8n start
```

Access at `http://localhost:5678`

### 2. Import Workflows

1. Open n8n interface
2. Click **Workflows** → **Import from File**
3. Import each JSON file:
   - `lead-capture.json`
   - `get-leads.json`
   - `update-lead-status.json`

### 3. Configure Credentials

#### Google Sheets

1. In n8n, go to **Credentials** → **Create New**
2. Select **Google Sheets OAuth2 API**
3. Follow authentication flow
4. Grant permissions

#### Resend

1. Get API key from [Resend Dashboard](https://resend.com/api-keys)
2. In n8n, **Credentials** → **Create New**
3. Select **HTTP Header Auth**
4. Name: `Authorization`
5. Value: `Bearer YOUR_RESEND_API_KEY`

### 4. Create Google Sheet

1. Create new Google Sheet named **"Leads"**
2. Add these column headers in Row 1:
   - Name
   - Email
   - Phone
   - Company
   - Message
   - Timestamp
   - Source
   - Status

3. Note the Sheet ID from URL:
   `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

### 5. Configure Each Workflow

#### Workflow 1: lead-capture

**Nodes to configure:**

1. **Webhook Node**
   - Path: `lead-capture`
   - Method: POST
   - Response: Immediately
   
2. **Google Sheets Node**
   - Operation: Append
   - Document: Select your "Leads" sheet
   - Sheet: Sheet1
   - Columns: Map all fields

3. **Resend Email (User)**
   - From: `onboarding@resend.dev`
   - To: `{{ $json.email }}`
   - Subject: "Thanks for reaching out!"
   - HTML: Customize your template

4. **Resend Email (Team)**
   - From: `onboarding@resend.dev`
   - To: `your-team@company.com`
   - Subject: "New Lead: {{ $json.name }}"

**Activate the workflow!**

#### Workflow 2: get-leads

**Nodes to configure:**

1. **Webhook Node**
   - Path: `get-leads`
   - Method: GET
   - Response: When Last Node Finishes

2. **Google Sheets Node**
   - Operation: Read Rows
   - Document: Select your "Leads" sheet
   - Sheet: Sheet1

3. **Code Node** (optional formatting)
```javascript
   // Format the data from Google Sheets
const leads = items.map(item => {
  const data = item.json;
  return {
    name: data.name || '',
    email: data.email || '',
    phone: data.phone || '',
    company: data.company || '',
    message: data.message || '',
    timestamp: data.timestamp || '',
    source: data.source || '',
    status: data.status || 'new'
  };
});

// Return formatted data
return [{ json: { leads } }];
```

**Activate the workflow!**

#### Workflow 3: update-lead-status

**Nodes to configure:**

1. **Webhook Node**
   - Path: `update-lead-status`
   - Method: POST
   - Response: When Last Node Finishes

2. **Google Sheets Node**
   - Operation: Update
   - Document: Select your "Leads" sheet
   - Sheet: Sheet1
   - Column to Match: Email
   - Value: `{{ $json.body.email }}`
   - Columns to Update: Status = `{{ $json.body.status }}`

**Activate the workflow!**

## 🔗 Get Webhook URLs

After activating workflows, get URLs:

1. Click on **Webhook** node in each workflow
2. Copy **Production URL**
3. Use these in your React apps:
```
Lead Form:
http://localhost:5678/webhook/lead-capture

Dashboard:
http://localhost:5678/webhook/get-leads
http://localhost:5678/webhook/update-lead-status
```

## 🧪 Testing Workflows

### Test lead-capture
```bash
curl -X POST http://localhost:5678/webhook/lead-capture \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "company": "Test Co",
    "message": "Testing workflow",
    "timestamp": "2024-01-28T10:00:00Z",
    "source": "website"
  }'
```

Check:
- ✅ Google Sheets has new row
- ✅ User received email
- ✅ Team received notification

### Test get-leads
```bash
curl http://localhost:5678/webhook/get-leads
```

Should return JSON array of all leads.

### Test update-lead-status
```bash
curl -X POST http://localhost:5678/webhook/update-lead-status \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "status": "contacted"
  }'
```

Check Google Sheets - status should update.

## 🚢 Production Deployment

### Self-Hosted (Recommended)

**Using Docker Compose:**
```yaml
version: '3.7'
services:
  n8n:
    image: n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=your_password
      - N8N_HOST=your-domain.com
      - N8N_PROTOCOL=https
      - WEBHOOK_URL=https://your-domain.com/
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:
```

Deploy with:
```bash
docker-compose up -d
```

### n8n Cloud

1. Sign up at [n8n.cloud](https://n8n.cloud)
2. Import workflows
3. Configure credentials
4. Activate workflows
5. Use provided webhook URLs

## 🔐 Security

### Enable Authentication
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=secure_password \
  n8nio/n8n
```

### Use HTTPS

Set up reverse proxy (nginx/Caddy) with SSL certificate.

### Secure Webhooks

Add authentication to webhook nodes or use n8n's built-in webhook authentication.

## 📊 Monitoring

### Check Workflow Executions

In n8n:
1. Go to **Executions**
2. View success/failure status
3. Debug failed executions
4. View execution data

### Set Up Alerts

Add error handling nodes to workflows to notify on failures.

## 🐛 Troubleshooting

### Webhooks not responding
- Check workflow is **activated**
- Verify n8n is running
- Check firewall/port 5678 is open
- Test with curl command

### Google Sheets errors
- Re-authenticate Google credentials
- Check Sheet ID is correct
- Verify column names match exactly

### Email not sending
- Check Resend API key is valid
- Verify "from" email is configured in Resend
- Check Resend dashboard for delivery status

### Data not updating
- Check webhook receives correct JSON format
- Verify Google Sheets column names
- Look at execution logs in n8n

## 📞 Support

Issues? Check the main [README](../README.md) or [n8n documentation](https://docs.n8n.io).
```
