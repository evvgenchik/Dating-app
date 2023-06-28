import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registrationData: RegisterDto) {
    const salt = +this.configService.get<number>('CRYPT_SALT');

    const hashedPassword = await bcrypt.hash(registrationData.password, salt);

    const createdUser = await this.usersService.create({
      ...registrationData,
      password: hashedPassword,
    });

    return createdUser;
  }

  async login(email: string, password: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      await this.verifyPassword(password, user.password);
      return user;
    } catch (error) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }
}
