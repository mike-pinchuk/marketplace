import { AdEntity } from "src/advertisment/advertisment.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PhotoEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;    

    @Column({ nullable: false})
    photo!: string;

    @ManyToOne(() => AdEntity, user => user.photo)
    @JoinColumn({name: 'photo_id'})
    ad?: AdEntity[]
}