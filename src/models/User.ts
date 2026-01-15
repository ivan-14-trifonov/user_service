import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  fullName!: string;

  @Column({ type: 'date' })
  birthDate!: Date;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ 
    type: process.env.DB_TYPE === 'sqlite' ? 'varchar' : 'enum', 
    enum: UserRole, 
    default: UserRole.USER 
  })
  role!: UserRole;

  @Column({ default: true })
  isActive!: boolean;
}