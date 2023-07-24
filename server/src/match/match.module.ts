import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { ConversationService } from 'src/chat/conversation/conversation.service';

@Module({
  controllers: [MatchController],
  imports: [PrismaModule],
  providers: [MatchService, UsersService, ConversationService],
})
export class MatchModule {}
