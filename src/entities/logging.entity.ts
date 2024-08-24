import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '@type/shared/abstract.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'logging' })
export class LogginEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, (user) => user.logging)
  user: UserEntity;
}
