import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/auth/guards/jwtAuth.guard';
import { MatchDeleteDto, MatchDto } from './dto/mathc.dto';
import { MatchService } from './match.service';
import { UsersService } from 'src/users/users.service';
import { ConversationService } from 'src/chat/conversation/conversation.service';

// @UseGuards(JwtAuthenticationGuard)
@Controller('match')
export class MatchController {
  constructor(
    private readonly matchService: MatchService,
    private readonly conversationService: ConversationService,
  ) {}

  @Post()
  async create(@Body() matchDto: MatchDto) {
    return await this.matchService.create(matchDto);
  }

  @Get()
  async findAll() {
    return await this.matchService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() { userAddressAnswer }) {
    const match = await this.matchService.update(id, userAddressAnswer);
    return await this.matchService.createMutual(match);
  }

  @Delete()
  async remove(@Body() matchDeleteDto: MatchDeleteDto) {
    await this.matchService.remove(matchDeleteDto);
    return await this.conversationService.removeByEmails(matchDeleteDto);
  }
}
