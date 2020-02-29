import { Entity, BaseEntity, PrimaryColumn, OneToMany, ManyToMany, JoinTable, Column } from "typeorm";
import { Beatmap } from "./beatmap";
import { Nomination } from "./nomination";
import { Category } from "./category";
import { Vote } from "./vote";

@Entity()
export class Beatmapset extends BaseEntity {
    
    @PrimaryColumn()
    ID!: number;
    
    @Column()
    artist!: string;

    @Column()
    title!: string;

    @Column()
    creator!: string;

    @Column()
    creatorID!: number;

    @Column()
    submitDate!: Date;

    @Column()
    approvedDate!: Date;

    @Column("double")
    BPM!: number;
    
    @Column()
    genre!: string;

    @Column()
    language!: string;
    
    @Column()
    favourites!: number;
    
    @OneToMany(type => Beatmap, beatmap => beatmap.beatmapset)
    beatmaps!: Beatmap[];
    
    @ManyToMany(type => Category, category => category.beatmapsets)
    @JoinTable()
    categories!: Category[];
    
    @OneToMany(type => Nomination, nomination => nomination.beatmapset)
    nominationsReceived!: Nomination[];
    
    @OneToMany(type => Vote, vote => vote.beatmapset)
    votesReceived!: Vote[];

}
