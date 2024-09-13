import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '@type/shared/abstract.entity';

import { UserEntity } from './user.entity';

@Entity({ name: 'orders' })
export class OrdersEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  @Column({ type: 'varchar', nullable: false, unique: true })
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  orderId: string;

  @Column({ type: 'varchar', nullable: false, unique: false })
  inscribrFees: string;

  @Column({ type: 'varchar', nullable: false, unique: false })
  networkFees: string;

  @Column({ type: 'varchar', nullable: false, unique: false })
  feeRate: string;

  @Column({ type: 'varchar', nullable: true, unique: false })
  txId: string;

  @Column({ type: 'varchar', nullable: false })
  status: string;

  @Column({ type: 'varchar', nullable: true })
  inscriptionId: string;

  @Column({ type: 'varchar', nullable: true })
  createdInscriptions: string[];

  @Column({ type: 'varchar', nullable: false })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;
}
