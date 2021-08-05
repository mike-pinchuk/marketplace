import { UserEntity } from "../user/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('message')
export class MessageEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: 'user_id'})
    userId!: number;

    @Column({type: 'text'})
    content!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @ManyToMany(() => UserEntity, (user: UserEntity) => user.message)
    @JoinTable({name: 'room'})
    user_message?: UserEntity[];
}