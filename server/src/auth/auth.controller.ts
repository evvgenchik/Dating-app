import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthenticationGuard } from './guards/localAuth.guard';
import { RequestWithUser } from './interfaces';
import { Response } from 'express';
import JwtAuthenticationGuard from './guards/jwtAuth.guard';
import { UsersService } from 'src/users/users.service';
import JwtRefreshGuard from './guards/jwt-authRefresh.guard';
import { UserEntity } from 'src/users/entities/user.entity';
import { EmailConfirmService } from 'src/emailConfirm/emailConfirm.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly emailConfirmService: EmailConfirmService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    await this.emailConfirmService.sendVerification(registrationData.email);
    const user = await this.authService.register(registrationData);
    return new UserEntity(user);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    console.log('login');
    const { user } = request;
    const accessTokenCookie = this.authService.getCookieWithJwtToken(user.id);
    const { refreshTokenCookie, refreshToken } =
      this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return new UserEntity(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    response.sendStatus(200);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtToken(
      request.user.id,
    );

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return new UserEntity(request.user);
  }
}
