import { LoggingEntity } from '@entities/logging.entity';
import { UserEntity } from '@entities/user.entity';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateLoggingDto {
  @IsDate()
  @IsOptional()
  loggedAt?: Date;

  @IsString()
  userId: string;
}
