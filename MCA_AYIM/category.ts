import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { ModeDivision } from "./modeDivision";
import { Beatmapset } from "./beatmapset";
import { Nomination } from "./nomination";
import { Vote } from "./vote";

@Entity()
export class Category extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    ID!: number;

    @Column()
    name!: string;

    @Column({ 
        type: "year",
        nullable: false, 
    })
    year!: number;

    @Column({ default: true })
    isAutomatic!: boolean;
    
    @Column()
    maxNominations!: number;
    
    @Column()
    isRequired!: boolean;

    @Column()
    type!: CategoryType;

    @Column()
    modeID!: number;
    
    @ManyToOne(type => ModeDivision, modeDivision => modeDivision.categories, {
        nullable: false,
        eager: true,
    })
    mode!: ModeDivision;

    @ManyToMany(type => Beatmapset, beatmapset => beatmapset.categories)
    beatmapsets!: Beatmapset[];

    @OneToMany(type => Nomination, nomination => nomination.category)
    nominations!: Nomination[];
    
    @OneToMany(type => Vote, vote => vote.category)
    votes!: Vote[];

}


export enum CategoryType {
    Beatmapsets,
    Users,
}
