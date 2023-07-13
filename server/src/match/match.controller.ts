import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
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

  async findAll(@Body() matchDto: MatchDto) {
    return await this.matchService.findAll();
  }

  async update(@Param('id') id: string, @Body() userAddressAnswer: boolean) {
    return await this.matchService.update(id, userAddressAnswer);
  }
}
