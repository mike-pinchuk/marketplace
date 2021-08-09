import { PhotoEntity } from "../photo/photo.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from '../user/user.entity';

@Entity('ad')
export class AdEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    title!: string;

    @Column({type: 'text', nullable: false})
    description!: string;

    @Column({nullable: false})
    price!: number;

    @Column({nullable: false, name: 'user_id'})
    userId!: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @ManyToOne(() => UserEntity, user => user.ad)
    @JoinColumn({name: 'id'})
    user?: UserEntity;

    @OneToMany(() => PhotoEntity, photo => photo.ad)
    @JoinColumn({name: 'ad_id'})
    photo?: PhotoEntity;

    @ManyToMany(() => UserEntity, (user: UserEntity) => user.ad_many)
    user_many?: UserEntity[];
}