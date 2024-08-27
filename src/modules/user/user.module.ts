import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '@entities/user.entity';

import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { LoggingRepository } from '@modules/logging/logging.repository';
import { LoggingService } from '@modules/logging/logging.service';
import { LoggingModule } from '@modules/logging/logging.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), HttpModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, LoggingRepository, LoggingService],
  exports: [UserService],
})
export class UserModule {}
