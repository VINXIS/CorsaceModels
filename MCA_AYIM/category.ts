import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { ModeDivision } from "./modeDivision";
import { Beatmapset } from "./beatmapset";
import { Nomination } from "./nomination";
import { CategorySection } from "./categorySection";
import { Vote } from "./vote";

@Entity()
export class Category extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    ID!: number;

    @Column()
    name!: string;

    @Column({ default: true })
    isAutomatic!: boolean;
    
    @Column()
    maxNominations!: number;
    
    @Column()
    sectionID!: number;

    @ManyToOne(type => CategorySection, categorySection => categorySection.categories, {
        nullable: false,
        eager: true,
    })
    section!: CategorySection;

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
