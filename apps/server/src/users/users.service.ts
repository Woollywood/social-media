import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  findById(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  create(email: string, passwordHash: string) {
    return this.prismaService.user.create({
      data: { email, passwordHash },
    });
  }
}
