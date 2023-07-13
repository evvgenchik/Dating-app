import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [MatchController],
  imports: [PrismaModule],
  providers: [MatchService, UsersService],
})
export class MatchModule {}
