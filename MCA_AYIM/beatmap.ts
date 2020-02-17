import { Entity, BaseEntity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Mode } from './mode';

@Entity()
export class Beatmap extends BaseEntity {

    @PrimaryColumn()
    ID: string;

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

    @ManyToOne(type => Mode, mode => mode.beatmaps)
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
    artistUnicode: string;

    @Column()
    title: string

    @Column()
    titleUnicode: string

    @Column()
    creator: string;

    @Column()
    creatorID: number;

    @Column()
    BPM: number;

    @Column()
    source: string;

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

    @Column()
    packs: string;

    @Column()
    maxCombo: number;

    @Column()
    aimSR: number;

    @Column()
    speedSR: number;

    @Column()
    totalSR: number;

}