# Task

Create a backend endpoint in the api directory that is publicly accesible which will later be used by a mail contact form submit. The specs for the endpoint are in @mail.md . Install nodemailer with yarn.

# Answer

I'll create the mail endpoint according to the specifications in `mail.md`. Let me start by installing nodemailer and then creating the API route.

[2 tools called]

Now let me check the middleware to understand how to make the endpoint publicly accessible:

[1 tool called]

Good! The middleware already excludes API routes, so the `/api/mail` endpoint will be publicly accessible. Now let me create the mail API route:

[1 tool called]

Now let me check for any linter errors:

[1 tool called]

Great! No linter errors. Let me check if there's an environment file to document the required variables:

[1 tool called]

Let me create a `.env.example` file to document the required environment variables:

[1 tool called]

Let me create documentation for the required environment variables:

[1 tool called]

Perfect! I've successfully created the mail endpoint. Here's what was implemented:

## ✅ Completed Tasks

### 1. **Installed Dependencies**
- Installed `nodemailer` and `@types/nodemailer` using yarn

### 2. **Created API Endpoint** (`/src/app/api/mail/route.ts`)
The endpoint implements all specifications from `mail.md`:
- **Route**: `POST /api/mail`
- **Input Validation**: Validates that `name`, `email`, and `message` are all present and non-empty strings
- **Response Codes**: Returns 200 for success, 400 for invalid requests
- **Email Template**: Uses the exact template specified:
  - From: `Irongirl.nl Contactformulier <${mailToAddress}>`
  - Reply-To: `${name} <${email}>`
  - Subject: `Irongirl.nl bericht van ${name}`
  - Body: The Dutch template with name, email, and message

### 3. **Security & Configuration**
- The endpoint is **publicly accessible** (middleware already excludes API routes)
- Uses environment variables for SMTP configuration:
  - `MAIL_TO_ADDRESS`
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_USER`
  - `SMTP_PASS`

### 4. **Documentation**
Created `docs/api-endpoints/mail-setup.md` with:
- Required environment variables
- Example configurations for Gmail and SendGrid
- Testing instructions with curl examples

## Next Steps

You'll need to create a `.env.local` file with your SMTP configuration. See the documentation in `mail-setup.md` for examples!