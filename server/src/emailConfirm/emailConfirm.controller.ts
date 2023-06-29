import { Body, Controller, Post } from '@nestjs/common';
import { EmailConfirmService } from './emailConfirm.service';
import ConfirmEmailDto from './dto/confirmEmail.dto';

@Controller('email-confirm')
export class EmailConfirmController {
  constructor(private readonly emailConfirmService: EmailConfirmService) {}

  @Post('confirm')
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.emailConfirmService.decodeConfirmationToken(
      confirmationData.token,
    );
    await this.emailConfirmService.confirmEmail(email);
  }
}
