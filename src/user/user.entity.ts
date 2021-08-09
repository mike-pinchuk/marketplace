import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { Exclude } from 'class-transformer';
import { AdEntity } from '../advertisment/advertisment.entity';
import { MessageEntity } from "../message/message.entity";
import { RoomEntity } from "src/room/room.entity";


export enum Role {
    RegisteredUser = 'registeredUser',
    Moderator = 'moderator',
    Support = 'support',
}

@Entity('user')
export class UserEntity extends BaseEntity {
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

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @OneToMany(() => AdEntity, ad => ad.user)
    @JoinColumn({name: 'user_id'})
    ad?: AdEntity[] 

    @OneToMany(() => MessageEntity, message => message.user)
    @JoinColumn({name: 'user_id'})
    message?: MessageEntity[];

    @ManyToMany(() => AdEntity, (ad: AdEntity) => ad.user_many)
    @JoinTable({name: 'purchase'})
    ad_many?: AdEntity[];

    @ManyToMany(() => RoomEntity, (room: RoomEntity) => room.user_many)
    @JoinTable({name: 'room_user'})
    room_many?: RoomEntity[];
}