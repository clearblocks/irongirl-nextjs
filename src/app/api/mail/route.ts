import { type NextRequest, NextResponse } from "next/server";

import nodemailer from "nodemailer";

interface MailRequest {
  name: string;
  email: string;
  message: string;
}

// Validate that all fields are present and non-empty
function isValidMailRequest(body: unknown): body is MailRequest {
  if (!body || typeof body !== "object") {
    return false;
  }

  const { name, email, message } = body as Record<string, unknown>;

  return (
    typeof name === "string" &&
    name.trim().length > 0 &&
    typeof email === "string" &&
    email.trim().length > 0 &&
    typeof message === "string" &&
    message.trim().length > 0
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body = await request.json();

    // Validate request
    if (!isValidMailRequest(body)) {
      return NextResponse.json(
        { error: "Invalid request. Name, email, and message are required and must be non-empty." },
        { status: 400 }
      );
    }

    const { name, email, message } = body;

    // Get configuration from environment variables
    const mailToAddress = process.env.MAIL_TO_ADDRESS;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // Validate environment configuration
    if (!mailToAddress || !smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      console.error("Mail configuration missing in environment variables");

      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Create transporter with SMTP settings
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: parseInt(smtpPort, 10) === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Prepare email content according to specification
    const mailOptions = {
      from: `Irongirl.nl Contactformulier <${mailToAddress}>`,
      to: mailToAddress,
      replyTo: `${name} <${email}>`,
      subject: `Irongirl.nl bericht van ${name}`,
      text: `Beste Irongirl,

Je hebt een bericht ontvangen van ${name}.

E-mailadres: ${email}

${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);

    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
