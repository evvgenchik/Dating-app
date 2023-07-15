import { Injectable } from '@nestjs/common';
import { MatchDto } from './dto/mathc.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { log } from 'console';
import { Match } from '@prisma/client';

@Injectable()
export class MatchService {
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(matchDto: MatchDto) {
    return this.prisma.match.create({
      data: matchDto,
    });
  }

  async createMutual(matchDto: Match) {
    delete matchDto.id;

    return this.prisma.match.create({
      data: {
        userAddressEmail: matchDto.userSourceEmail,
        userSourceEmail: matchDto.userAddressEmail,
        userAddressAnswer: true,
      },
    });
  }

  async findAll() {
    return this.prisma.match.findMany({});
  }

  async findBySource(userSourceEmail: string) {
    return this.prisma.match.findMany({ where: { userSourceEmail } });
  }

  async update(id: string, userAddressAnswer: boolean) {
    return this.prisma.match.update({
      where: { id },
      data: { userAddressAnswer },
    });
  }
}
