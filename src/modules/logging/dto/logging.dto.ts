import { LoggingEntity } from '@entities/logging.entity';
import { UserEntity } from '@entities/user.entity';
import { IsDate, IsString } from 'class-validator';

export class LoggingDto {
  @IsDate()
  loggedAt: Date;
}
