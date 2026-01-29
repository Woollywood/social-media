import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UserDto } from '../dto/user/dto/user.dto';

import { AuthTokensDto } from './dto/auth-tokens.dto';
import { LoginDto } from './dto/login.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignupDto } from './dto/signup.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { type RequestWithUser } from './types/request-with-user';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login with email and password.' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, type: AuthTokensDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @Post('login')
  login(@Request() req: RequestWithUser) {
    return this.authService.issueTokens(req.user.id);
  }

  @ApiOperation({ summary: 'Register a new user.' })
  @ApiResponse({ status: 201, type: AuthTokensDto })
  @Post('signup')
  signup(@Body() body: SignupDto) {
    return this.authService.signup(
      body.email,
      body.username,
      body.password,
      body.avatarUrl,
    );
  }

  @ApiOperation({ summary: 'Rotate access/refresh tokens.' })
  @ApiResponse({ status: 200, type: AuthTokensDto })
  @ApiUnauthorizedResponse({ description: 'Invalid refresh token.' })
  @Post('refresh')
  refresh(@Body() body: RefreshTokenDto) {
    return this.authService.refreshTokens(body.refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user.' })
  @ApiResponse({ status: 200, type: UserDto })
  @ApiUnauthorizedResponse({ description: 'Invalid access token.' })
  @Get('me')
  me(@Request() req: RequestWithUser) {
    return req.user;
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout and revoke current session.' })
  @ApiResponse({ status: 200, type: LogoutResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid access token.' })
  @Post('logout')
  async logout(@Request() req: RequestWithUser) {
    const token = this.extractAccessToken(req);
    await this.authService.logout(token);
    return { success: true };
  }

  private extractAccessToken(req: RequestWithUser) {
    const header = req.headers?.authorization;

    if (!header) {
      return '';
    }

    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
      return '';
    }

    return token;
  }
}
