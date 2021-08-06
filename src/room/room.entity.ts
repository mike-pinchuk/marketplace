import { MessageEntity } from "src/message/message.entity";
import { UserEntity } from "src/user/user.entity";
import { BaseEntity, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('room')
export class RoomEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @ManyToMany(() => UserEntity, (user: UserEntity) => user.room_many)
    user_many?: MessageEntity[];

    @OneToMany(() => MessageEntity, message => message.room)
    @JoinColumn({name: 'room_id'})
    messages?: MessageEntity[]
}