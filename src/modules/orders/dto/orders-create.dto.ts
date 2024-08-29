import { IsString } from 'class-validator';

export class OrdersCreateDto {
  @IsString()
  inscriptionId: string;

  @IsString()
  orderId?: string;

  @IsString()
  status: string;

  @IsString()
  userId: string;
}
