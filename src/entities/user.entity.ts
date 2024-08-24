import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '@type/shared/abstract.entity';
import { LogginEntity } from './logging.entity';

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

  @OneToOne(() => LogginEntity, (user) => user.user)
  logging: LogginEntity;
}
