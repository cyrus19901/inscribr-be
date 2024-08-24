import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserEntity } from '@entities/user.entity';

import { UserNotFoundException } from '@exceptions/user-not-found';

import {
  CollectionsResponse,
  InscriptionObject,
  TokenObject,
} from '@type/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { PostgresErrorCode } from './enum/error.enum';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    try {
      const user = await this.userRepository.createUser(dto);
      return user;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async getByAddress(address: string): Promise<UserDto> {
    const user = await this.userRepository.findByAddress(address);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
