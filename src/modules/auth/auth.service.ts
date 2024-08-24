import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

// import { SocialAccountDto } from '@modules/social/dto/social-account.dto';
// import { SocialService } from '@modules/social/social.service';
import { JwtPayload } from '@type/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  getCookieWithJwtToken(email: string, request: Request): string {
    const payload: JwtPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_KEY'),
      expiresIn: `${this.configService.get('JWT_EXPIRATION_TIME')}s`,
    });

    if (this.configService.get('APP_ENV') === 'dev') {
      const isLocalhost =
        request.headers.host === 'localhost:3000' ||
        request.headers.host === 'localhost:3001';
      return `session=${token}; Path=/; Max-Age=${this.configService.get(
        'JWT_EXPIRATION_TIME',
      )}; ${isLocalhost ? '' : 'SameSite=None; Secure; HttpOnly;'}`;
    }

    return `session=${token}; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}; SameSite=None; Secure; HttpOnly;`;
  }

  getCookiesForLogout() {
    return ['session=; SameSite=None; Secure; HttpOnly; Path=/; Max-Age=0'];
  }
}
