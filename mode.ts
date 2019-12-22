import { Column, Entity, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity()
export class Mode extends BaseEntity {

    @PrimaryColumn()
    name: string;

}

export enum Modes {
    Standard = 0,
    Taiko = 1,
    Fruits = 2,
    Mania = 3,
    Storyboard = 4,
}