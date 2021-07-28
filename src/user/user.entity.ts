import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { Exclude } from 'class-transformer';


export enum Role {
    RegisteredUser = 'registeredUser',
    Moderator = 'moderator',
    Support = 'support',
}

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: false, unique: true })
    email!: string;

    @Column({ nullable: false, select: false, name: 'password_hash'})
    @Exclude()
    passwordHash!: string;

    @Column({ nullable: false, unique: true, name: 'phone_number' })
    phoneNumber!: string;

    @Column({ name: 'role', select: true, nullable: false, type: 'varchar', default: Role.RegisteredUser })
    role!: Role;

    @Column({ name: 'ad_id', nullable: true,})
    adId?: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

}