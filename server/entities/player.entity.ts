import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';

@Entity('player')
export class Player extends BaseEntity {
  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ default: false })
  isAdmin!: boolean;

  @Column({ nullable: true })
  lastSeenAt!: Date;

  @Column({ nullable: true })
  currentGameId!: number;

  // Game relation will be added when the Game entity is created
}
