# Mail endpoint

Send an email to a configured mail address

POST /mail
Input: MailRequest {name: string, email: string, message: string} (all fields required, non-empty)
Output: only response code 200 (ok), 400 (invalid request)
Logic: Send an email (using nodemailer) to a configured email address (mailToAddress) using configured SMTP settings.

Use the following template:

Mail Headers: 
`From: Irongirl.nl Contactformulier <${mailToAddress}>\r\nReply-To: ${name}<${email}>
Subject: 
`Irongirl.nl bericht van ${name}`
Body: 
`Beste Irongirl, 

Je hebt een bericht ontvangen van ${name}.

E-mailadres: ${email}

${message}
