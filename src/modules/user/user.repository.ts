import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '@entities/user.entity';
import { InscriptionObject } from '@type/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { LoggingEntity } from '@entities/logging.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.create(dto);
    const savedUser = await this.save(newUser);
    return await this.save(savedUser);
  }

  async findByAddress(userAddress: string): Promise<UserDto> {
    try {
      const user = await this.findOne({
        where: { userAddress },
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
