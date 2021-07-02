import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import {User} from '../user/user.entity';

@Entity('role')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
    id!: string;

    @Column()
    name!: string;

    @OneToMany(() => User, (role) => role.role)
    @JoinColumn({name: 'id'})
    users?: User[];
}