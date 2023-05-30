import nodemailer from 'nodemailer';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: false,
      auth: {},
    });
  }

  async sendActivationMail(email, link) {}
}

export default new MailService();
