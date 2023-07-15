import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/auth/guards/jwtAuth.guard';
import { MatchDto } from './dto/mathc.dto';
import { MatchService } from './match.service';
import { UsersService } from 'src/users/users.service';

@UseGuards(JwtAuthenticationGuard)
@Controller('match')
export class MatchController {
  constructor(
    private readonly matchService: MatchService,
    private readonly userService: UsersService,
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
}
