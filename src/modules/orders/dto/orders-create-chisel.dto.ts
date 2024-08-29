import { IsInstance, IsNumber, IsOptional, IsString } from 'class-validator';

export class OrdersCreateChiselDto {
  @IsString()
  userAddress: string;

  @IsString()
  inscriptionId: string;

  @IsString()
  fees: string;
}
