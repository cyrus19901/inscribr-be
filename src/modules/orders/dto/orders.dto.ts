import { IsString } from 'class-validator';

export class OrdersDto {
  @IsString()
  inscriptionId?: string;

  @IsString()
  orderId?: string;

  @IsString()
  status: string;
}
