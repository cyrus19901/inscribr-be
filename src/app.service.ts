import { Injectable } from '@nestjs/common';

import { API_TOKEN_SALT } from './constants';

@Injectable()
export class AppService {
  getHealth() {
    return { message: 'Server is running' };
  }

  getTimestamp() {
    return { s: API_TOKEN_SALT, t: Math.floor(Date.now() / 1000) };
  }
}
