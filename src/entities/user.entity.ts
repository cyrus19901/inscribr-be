import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AbstractEntity } from '@type/shared/abstract.entity';
import { LoggingEntity } from './logging.entity';
import { LoggingDto } from '@modules/logging/dto/logging.dto';

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  userAddress: string;

  @Column({ type: 'varchar', nullable: false, unique: false })
  wallet: string;

  @Column({ type: 'integer', nullable: true, unique: false })
  points: number;

  @OneToMany(() => LoggingEntity, (logging) => logging.user)
  @JoinColumn()
  logging: LoggingDto[];
}
