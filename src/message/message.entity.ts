import { UserEntity } from "src/user/user.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('message')
export class MessageEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: 'user_id'})
    userId!: number;

    @Column({type: 'text'})
    content!: string;

    @ManyToMany(() => UserEntity, (user: UserEntity) => user.message)
    @JoinTable({name: 'room'})
    user_message?: UserEntity[];
}