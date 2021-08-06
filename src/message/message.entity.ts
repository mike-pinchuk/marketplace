import { UserEntity } from "../user/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoomEntity } from "src/room/room.entity";

@Entity('message')
export class MessageEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: 'user_id'})
    userId!: number;

    @Column({type: 'text'})
    content!: string;

    @Column({name: 'room_id'})
    roomId!: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @ManyToOne(() => UserEntity, user => user.message)
    @JoinColumn({name: 'id'})
    user?: UserEntity;
    
    @ManyToOne(() => RoomEntity, room => room.messages)
    @JoinColumn({name: 'id'})
    room?: RoomEntity;
}