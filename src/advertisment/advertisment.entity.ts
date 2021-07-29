import { PhotoEntity } from "src/photo/photo.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from '../user/user.entity';

@Entity('ad')
export class AdEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    title!: string;

    @Column({type: 'text', nullable: false})
    description!: string;

    @Column({nullable: true, name: 'photo_id', default: null})
    photoId!: number;

    @Column({nullable: false})
    price!: number;

    @ManyToOne(() => UserEntity, user => user.adId)
    @JoinColumn({name: 'ad_id'})
    user?: UserEntity;

    @OneToMany(() => PhotoEntity, photo => photo.ad)
    @JoinColumn({name: 'id'})
    photo?: PhotoEntity;

    @ManyToMany(() => UserEntity, (user: UserEntity) => user.ad_many)
    user_many?: UserEntity[];
}