import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { EmailConfirmService } from './emailConfirm.service';
import ConfirmEmailDto from './dto/confirmEmail.dto';
import { Request, Response } from 'express';

@Controller('email-confirm')
export class EmailConfirmController {
  constructor(private readonly emailConfirmService: EmailConfirmService) {}

  @Get('')
  async confirm(@Req() req: Request, @Res() res: Response) {
    const token = req.query.token.toString();
    const email = await this.emailConfirmService.decodeConfirmationToken(token);
    await this.emailConfirmService.confirmEmail(email);
    res.redirect('http://localhost:5173/');
  }
}
