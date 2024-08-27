import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AbstractEntity } from '@type/shared/abstract.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'logging' })
export class LoggingEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  @Column({ type: 'varchar', nullable: false, unique: true })
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  loggedAt: Date;

  @Column({ type: 'varchar', nullable: false })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.logging)
  user: UserEntity;
}
