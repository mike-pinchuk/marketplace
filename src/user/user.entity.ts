import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
    id!: string;

    @Column({nullable: false})
    name!: string;

    @Column({nullable: false, unique: true})
    email!: string;

    @Column({nullable: false, select: false})
    password!: string;

    @Column({nullable: false, unique: true, name: 'phone_number'})
    phoneNumber!: string;

    @Column({name: 'role_id'})
    roleId!: number;
    
    @Column({name: 'ad_id'})
    adId!: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt!: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt!: Date;
    
}