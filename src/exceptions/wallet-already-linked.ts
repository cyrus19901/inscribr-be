import { BadRequestException } from '@nestjs/common';

export class WalletAlreadyLinkedException extends BadRequestException {
  constructor(error?: string) {
    super('error.wallet-already-linked', error);
  }
}
