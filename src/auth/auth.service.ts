import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

async register(username: string, password: string) {
  const existingUser = await prisma.user.findUnique({ where: { username } });

  if (existingUser) {
    throw new Error('Username already taken');
  }

  const hash = await bcrypt.hash(password, 10);
  return prisma.user.create({ data: { username, password: hash } });
}

  async login(username: string, password: string) {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}