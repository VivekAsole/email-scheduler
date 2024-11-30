import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.mailersend.net',
  port: 587,                   // 587 for TLS (secure connection)
  secure: false,               // TLS
  auth: {
    user: process.env.Mailersend_SMTP_username,  // Mailersend SMTP username
    pass: process.env.EMAIL_PASSWORD   // Mailersend SMTP password
  }
});

export default transporter;