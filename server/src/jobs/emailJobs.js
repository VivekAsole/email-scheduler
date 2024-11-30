import transporter from '../config/nodemailer.js'

export const defineEmailJobs = (agenda) => {
  
  agenda.define('sendEmail', async (job) => {

    const { subject, body, recipients } = job.attrs.data;

    try {
      await transporter.sendMail({
        from: process.env.Mailersend_SMTP_username,
        to: recipients,
        subject: subject,
        text: body,
      });
      console.log(`Email sent to ${recipients}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });
};

