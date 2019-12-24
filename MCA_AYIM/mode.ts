import { Entity, BaseEntity, PrimaryColumn, OneToMany } from 'typeorm';
import { Beatmap } from './beatmap';

@Entity()
export class Mode extends BaseEntity {

    @PrimaryColumn()
    name: Modes;

    @OneToMany(type => Beatmap, beatmap => beatmap.mode)
    beatmaps: Beatmap[];

}

export enum Modes {
    Standard,
    Taiko,
    Fruits,
    Mania,
    Storyboard,
}