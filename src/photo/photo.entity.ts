import { AdEntity } from "../advertisment/advertisment.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('photo')
export class PhotoEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;    

    @Column({name: 'ad_id', nullable: false})
    adId!: number;

    @Column({ nullable: false})
    photo!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @ManyToOne(() => AdEntity, user => user.photo)
    @JoinColumn({name: 'id'})
    ad?: AdEntity[];
}