import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MessageService } from './message/message.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConversationService } from './conversation/conversation.service';

@Module({
  providers: [ChatGateway, MessageService, ConversationService],
  imports: [PrismaModule],
})
export class ChatModule {}
