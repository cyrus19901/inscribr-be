import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userAddress: string;

  @IsString()
  wallet: string;

  @IsOptional()
  @IsNumber()
  points: number;
}
