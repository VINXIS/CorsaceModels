import { Entity, BaseEntity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Mode } from './mode';

@Entity()
export class Beatmap extends BaseEntity {

    @PrimaryColumn()
    name: string;

    @Column()
    submitDate: Date;

    @Column()
    approvedDate: Date;

    @Column()
    artist: string;

    @Column()
    title: string

    @Column()
    beatmapsetID: number;

    @Column()
    creator: string;

    @Column()
    creatorID: number;

    @Column()
    hitLength: number;

    @Column()
    source: string;

    @ManyToOne(type => Mode, mode => mode.beatmaps)
    mode: Mode;

}