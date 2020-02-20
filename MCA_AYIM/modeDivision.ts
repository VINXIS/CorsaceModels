import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserComment } from './userComments';

@Entity()
export class ModeDivision extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    name: string;

    @OneToMany(type => UserComment, userComment => userComment.mode)
    userComments: UserComment[];

}

export enum ModeDivisionType {
    Standard = 1,
    Taiko = 2,
    Fruits = 3,
    Mania = 4,
    Storyboard = 5,
}
