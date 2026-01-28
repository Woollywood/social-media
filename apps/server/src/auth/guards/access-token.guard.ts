import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from '../auth.service';
import { type RequestWithUser } from '../types/request-with-user';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException('Access token required.');
    }

    request.user = await this.authService.validateAccessToken(token);
    return true;
  }

  private extractToken(request: RequestWithUser) {
    const header = request.headers?.authorization;
    if (!header) return null;

    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) return null;

    return token;
  }
}
