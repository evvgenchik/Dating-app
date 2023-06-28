import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
  Res,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthenticationGuard } from './guards/localAuth.guard';
import { RequestWithUser } from './interfaces';
import { Response } from 'express';
import JwtAuthenticationGuard from './guards/jwtAuth.guard';
import { UsersService } from 'src/users/users.service';
import JwtRefreshGuard from './guards/jwt-authRefresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const accessTokenCookie = this.authService.getCookieWithJwtToken(user.id);
    const { refreshTokenCookie, refreshToken } =
      this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    response.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    response.send(user);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    response.sendStatus(200);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtToken(
      request.user.id,
    );

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }

  // @HttpCode(200)
  // @UseGuards(LocalAuthenticationGuard)
  // @Post('log-in')
  // async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
  //   const { user } = request;
  //   const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
  //   response.setHeader('Set-Cookie', cookie);
  //   user.password = undefined;
  //   return response.send(user);
  // }

  // @UseGuards(JwtAuthenticationGuard)
  // @Post('log-out')
  // async logOut(@Res() response: Response) {
  //   response.setHeader(
  //     'Set-Cookie',
  //     this.authenticationService.getCookieForLogOut(),
  //   );
  //   return response.sendStatus(200);
  // }

  // @UseGuards(JwtAuthenticationGuard)
  // @Get()
  // authenticate(@Req() request: RequestWithUser) {
  //   const user = request.user;
  //   user.password = undefined;
  //   return user;
  // }
}
