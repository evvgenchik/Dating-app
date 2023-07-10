import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtAuthenticationGuard extends AuthGuard('jwt') {
  // handleRequest(err, user, info, context, status) {
  //   if (!user && info?.toString() === 'Error: No auth token') {
  //     console.log('BR');
  //     err = new UnauthorizedException('No access token');
  //     return err;
  //   }
  //   return user;
  // }
}
