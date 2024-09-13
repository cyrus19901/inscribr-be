import { IsNumber, IsOptional, IsString } from 'class-validator';

export interface ChiselTx {
  txid: string;
  isConfirmed: boolean;
  isBroadcast: boolean;
}

export interface ChiselTxObject {
  txids: ChiselTx[];
}

export class OrdersResponseChiselDto {
  @IsString()
  id: string;

  @IsString()
  destination: string;

  @IsString()
  fee_rate: number;

  @IsString()
  status: string;

  @IsNumber()
  size: number;

  @IsNumber()
  expiration: number;

  @IsOptional()
  transactionData?: ChiselTxObject;
}
