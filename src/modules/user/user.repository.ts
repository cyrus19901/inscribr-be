import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '@entities/user.entity';
import { InscriptionObject } from '@type/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.create(dto);
    return await this.save(newUser);
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.findOne({
      where: { id },
    });

    return user;
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

  async getUserInscriptionsByCollection(
    ownerAddress: string,
    offset: number,
    limit: number,
  ): Promise<InscriptionObject> {
    const { data } = await axios.get(
      `https://api-mainnet.magiceden.dev/v2/ord/btc/tokens?ownerAddress=${ownerAddress}&offset=${offset}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MAGIC_EDEN_TOKEN}`,
        },
      },
    );
    return data;
  }
}
