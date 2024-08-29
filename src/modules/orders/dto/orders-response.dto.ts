import { IsString } from 'class-validator';

export class OrdersResponseDto {
  @IsString()
  id: string;

  @IsString()
  inscriptionId: string;

  @IsString()
  status: string;

  @IsString()
  txId: string;

  @IsString()
  createdAt: Date;
}
