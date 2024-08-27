import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggingEntity } from '@entities/logging.entity';
import { LoggingController } from './logging.controller';
import { LoggingService } from './logging.service';
import { LoggingRepository } from './logging.repository';
import { UserRepository } from '@modules/user/user.repository';
import { UserService } from '@modules/user/user.service';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([LoggingEntity]), HttpModule, UserModule],
  controllers: [LoggingController],
  providers: [LoggingService, LoggingRepository, UserRepository, UserService],
  exports: [LoggingService],
})
export class LoggingModule {}
