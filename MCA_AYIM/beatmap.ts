import { Entity, BaseEntity, PrimaryColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { GuestRequest } from './guest';

@Entity()
export class Beatmap extends BaseEntity {

    @PrimaryColumn()
    ID: number;

    @Column()
    setID: number;

    @Column()
    totalLength: number;

    @Column()
    hitLength: number;

    @Column()
    difficulty: string;

    @Column()
    circleSize: number;

    @Column()
    overallDifficulty: number;

    @Column()
    approachRate: number;

    @Column()
    hpDrain: number;

    @Column()
    mode: Mode;

    @Column()
    circles: number;

    @Column()
    sliders: number;

    @Column()
    spinners: number;

    @Column()
    submitDate: Date;

    @Column()
    approvedDate: Date;

    @Column()
    artist: string;

    @Column()
    title: string;

    @Column()
    creator: string;

    @Column()
    creatorID: number;

    @Column()
    BPM: number;

    @Column()
    genre: string;

    @Column()
    language: string;

    @Column()
    favourites: number;

    @Column()
    rating: number;

    @Column({ default: false })
    storyboard: boolean;

    @Column({ default: false })
    video: boolean;

    @Column()
    playCount: number;

    @Column()
    passCount: number;

    @Column({ nullable: true })
    packs: string;

    @Column({ nullable: true })
    maxCombo: number;

    @Column({ nullable: true })
    aimSR: number;

    @Column({ nullable: true })
    speedSR: number;

    @Column()
    totalSR: number;

    @OneToMany(type => GuestRequest, guestRequest => guestRequest.beatmap)
    guestRequests: GuestRequest[]

}

export enum Mode {
    "standard",
    "taiko",
    "fruits",
    "mania"
}