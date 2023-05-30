import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(emailTo, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: emailTo,
      subject: `Account activation for ${process.env.API_URL}`,
      text: '',
      html: `
      <div>
        <h1>Activation Link</h1>
        <a href="${link}">${link}</a>
      </div>
      `,
    });
  }
}

export default new MailService();
