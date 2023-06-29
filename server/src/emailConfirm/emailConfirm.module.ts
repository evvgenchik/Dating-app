import { Module } from '@nestjs/common';
import { EmailConfirmService } from './emailConfirm.service';
import { EmailConfirmController } from './emailConfirm.controller';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EmailConfirmController],
  providers: [
    EmailConfirmService,
    JwtService,
    MailService,
    UsersService,
    PrismaService,
  ],
  exports: [EmailConfirmService],
})
export class EmailConfirmModule {}
