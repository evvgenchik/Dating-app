import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { InvalidMailException } from 'src/common/exceptions/invalidMail.exception';

@Injectable()
export class MailService {
  private nodemailerTransport: Mail;

  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport({
      host: configService.get('SMTP_HOST'),
      port: configService.get('SMTP_PORT'),
      secure: true,
      auth: {
        user: configService.get('SMTP_USER'),
        pass: configService.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendMail(options: Mail.Options) {
    try {
      await this.nodemailerTransport.sendMail(options);
    } catch (error) {
      // Not throw error on invalid email
      // if (error.responseCode === 550) throw new InvalidMailException();
      console.log(error);
    }
  }
}
