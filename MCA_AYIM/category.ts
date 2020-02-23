import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';
import { Beatmap } from './beatmap';
import { ModeDivision } from './modeDivision';

@Entity()
export class Category extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    ID!: number;

    @Column()
    name!: string;

    @Column({ default: true })
    isAutomatic!: boolean;
    
    @Column()
    modeID!: number;
    
    @ManyToOne(type => ModeDivision, modeDivision => modeDivision.categories, {
        nullable: false,
        eager: true,
    })
    mode!: ModeDivision;

    @ManyToMany(type => Beatmap, beatmap => beatmap.categories)
    beatmaps!: Beatmap[];
    
}
