import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userID: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: 'default' })
  nickname: string;
}
