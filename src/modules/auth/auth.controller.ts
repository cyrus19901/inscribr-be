import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import JwtGuard from '@guards/jwt.guard';

// import { SocialAccountDto } from '@modules/social/dto/social-account.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  @UseGuards(JwtGuard)
  async getAuth() {
    return { message: 'authenticated' };
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req: Request) {
    const cookie = this.authService.getCookiesForLogout();
    req.res.setHeader('Set-Cookie', cookie);
    return { message: 'logged out' };
  }
}
