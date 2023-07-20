import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MessageService } from 'src/message/message.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConversationService } from 'src/conversation/conversation.service';

@Module({
  providers: [ChatGateway, ChatService, MessageService, ConversationService],
  imports: [PrismaModule],
})
export class ChatModule {}
