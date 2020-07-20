import { Entity, BaseEntity, PrimaryColumn, OneToMany, ManyToMany, JoinTable, Column, ManyToOne } from "typeorm";
import { Beatmap } from "./beatmap";
import { Nomination } from "./nomination";
import { Category } from "./category";
import { Vote } from "./vote";
import { User } from "../user";

@Entity()
export class Beatmapset extends BaseEntity {
    
    @PrimaryColumn()
    ID!: number;
    
    @Column()
    artist!: string;

    @Column()
    title!: string;

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
    
    @OneToMany(type => Beatmap, beatmap => beatmap.beatmapset, {
        eager: true,
    })
    beatmaps!: Beatmap[];

    @ManyToOne(type => User, user => user.beatmapsets)
    creator!: User;
    
    @OneToMany(type => Nomination, nomination => nomination.beatmapset)
    nominationsReceived!: Nomination[];
    
    @OneToMany(type => Vote, vote => vote.beatmapset)
    votesReceived!: Vote[];

}
