import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { config } from './common/config/configuration';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MailModule } from './mail/mail.module';
import { EmailConfirmModule } from './emailConfirm/emailConfirm.module';
import { MatchModule } from './match/match.module';
import { MessageModule } from './chat/message/message.module';
import { ConversationModule } from './chat/conversation/conversation.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    UsersModule,
    PrismaModule,
    AuthModule,
    CloudinaryModule,
    MailModule,
    EmailConfirmModule,
    MatchModule,
    MessageModule,
    ConversationModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
