import { IsOptional, IsString } from 'class-validator';

export class OrdersUpdateDto {
  @IsString()
  orderId: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsOptional()
  @IsString()
  feesRate?: string;

  @IsOptional()
  @IsString()
  tx?: string;
}
