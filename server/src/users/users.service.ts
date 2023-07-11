import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: string) {
    //await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
  }

  async setCurrentRefreshToken(refreshToken: string, id: string) {
    const salt = +this.configService.get<number>('CRYPT_SALT');
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        hashedRefreshToken,
      },
    });
  }

  async verifyRefreshToken(refreshToken: string, id: string) {
    const user = await this.findOne(id);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { hashedRefreshToken: null },
    });
  }

  async markEmailAsConfirmed(email: string) {
    return this.prisma.user.update({
      where: {
        email,
      },
      data: {
        isEmailConfirmed: true,
      },
    });
  }
}
