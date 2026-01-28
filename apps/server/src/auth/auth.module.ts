import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

import { AccessTokenGuard } from './guards/access-token.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule, PrismaModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, AccessTokenGuard, LocalAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
