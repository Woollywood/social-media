import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';

import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

import { type TokenPayload } from './types/token-payload';
import { type TokenType } from './types/token-type';
import { comparePasswordHash } from './utils/compare-password-hash';
import { hashPassword } from './utils/hash-password';

const ACCESS_TOKEN_TTL_SECONDS = 15 * 60;
const REFRESH_TOKEN_TTL_SECONDS = 30 * 24 * 60 * 60;

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const isValid = await comparePasswordHash(password, user.passwordHash);
    if (!isValid) return null;

    return { id: user.id, email: user.email };
  }

  async issueTokens(userId: string) {
    const accessToken = this.createToken(
      'access',
      userId,
      this.getAccessTtlSeconds(),
    );
    const refreshToken = this.createToken(
      'refresh',
      userId,
      this.getRefreshTtlSeconds(),
    );

    await this.prismaService.session.create({
      data: {
        userId,
        accessToken,
        refreshToken,
      },
    });

    return { accessToken, refreshToken };
  }

  async signup(email: string, password: string) {
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new ConflictException('Email already registered.');
    }

    const passwordHash = await hashPassword(password);
    const user = await this.usersService.create(email, passwordHash);

    return this.issueTokens(user.id);
  }

  async refreshTokens(refreshToken: string) {
    const payload = this.parseToken(refreshToken);
    if (!payload || payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid refresh token.');
    }

    if (this.isExpired(payload)) {
      throw new UnauthorizedException('Refresh token expired.');
    }

    const session = await this.prismaService.session.findUnique({
      where: { refreshToken },
    });

    if (!session || session.userId !== payload.sub) {
      throw new UnauthorizedException('Refresh token not found.');
    }

    const accessToken = this.createToken(
      'access',
      payload.sub,
      this.getAccessTtlSeconds(),
    );
    const nextRefreshToken = this.createToken(
      'refresh',
      payload.sub,
      this.getRefreshTtlSeconds(),
    );

    await this.prismaService.session.update({
      where: { id: session.id },
      data: { accessToken, refreshToken: nextRefreshToken },
    });

    return { accessToken, refreshToken: nextRefreshToken };
  }

  async validateAccessToken(accessToken: string) {
    const payload = this.parseToken(accessToken);
    if (!payload || payload.type !== 'access') {
      throw new UnauthorizedException('Invalid access token.');
    }

    if (this.isExpired(payload)) {
      throw new UnauthorizedException('Access token expired.');
    }

    const session = await this.prismaService.session.findUnique({
      where: { accessToken },
    });

    if (!session || session.userId !== payload.sub) {
      throw new UnauthorizedException('Access token not found.');
    }

    const user = await this.usersService.findById(session.userId);
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    return { id: user.id, email: user.email };
  }

  async logout(accessToken: string) {
    await this.prismaService.session.deleteMany({
      where: { accessToken },
    });
  }

  private createToken(type: TokenType, userId: string, ttlSeconds: number) {
    const issuedAt = Math.floor(Date.now() / 1000);
    const payload: TokenPayload = {
      type,
      sub: userId,
      iat: issuedAt,
      exp: issuedAt + ttlSeconds,
    };

    const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const randomPart = randomBytes(32).toString('base64url');
    return `${encoded}.${randomPart}`;
  }

  private parseToken(token: string): TokenPayload | null {
    const [payloadPart] = token.split('.');
    if (!payloadPart) return null;

    try {
      const decoded = Buffer.from(payloadPart, 'base64url').toString('utf8');
      return JSON.parse(decoded) as TokenPayload;
    } catch {
      return null;
    }
  }

  private isExpired(payload: TokenPayload) {
    return payload.exp <= Math.floor(Date.now() / 1000);
  }

  private getAccessTtlSeconds() {
    const configured = this.configService.get<number>(
      'ACCESS_TOKEN_TTL_SECONDS',
    );
    return configured ?? ACCESS_TOKEN_TTL_SECONDS;
  }

  private getRefreshTtlSeconds() {
    const configured = this.configService.get<number>(
      'REFRESH_TOKEN_TTL_SECONDS',
    );
    return configured ?? REFRESH_TOKEN_TTL_SECONDS;
  }
}
