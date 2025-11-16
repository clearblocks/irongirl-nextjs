# Mail Endpoint Setup

## Environment Variables

The mail endpoint requires the following environment variables to be configured in your `.env.local` file:

```bash
# Mail Configuration (for contact form)
MAIL_TO_ADDRESS=your-email@example.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
```

## Configuration Details

- **MAIL_TO_ADDRESS**: The email address where contact form submissions will be sent
- **SMTP_HOST**: Your SMTP server hostname (e.g., smtp.gmail.com, smtp.sendgrid.net)
- **SMTP_PORT**: SMTP port (typically 587 for TLS, 465 for SSL, 25 for unencrypted)
- **SMTP_USER**: SMTP authentication username
- **SMTP_PASS**: SMTP authentication password

## Example Configurations

### Gmail

```bash
MAIL_TO_ADDRESS=your-email@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
```

Note: For Gmail, you'll need to use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

### SendGrid

```bash
MAIL_TO_ADDRESS=your-email@example.com
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

## Testing

You can test the endpoint using curl:

```bash
curl -X POST http://localhost:3000/api/mail \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

Expected response for success:

```json
{ "success": true }
```

Expected response for invalid request:

```json
{ "error": "Invalid request. Name, email, and message are required and must be non-empty." }
```
