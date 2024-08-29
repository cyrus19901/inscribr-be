import { BadRequestException } from '@nestjs/common';

export class OrderTypeNotFoundException extends BadRequestException {
  constructor(error?: string) {
    super('error.order-type-not-found', error);
  }
}
