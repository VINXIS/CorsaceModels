import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { ModeDivision } from "./modeDivision";
import { Beatmapset } from "./beatmapset";
import { Nomination } from "./nomination";
import { Vote } from "./vote";
import { MCA } from "./mca";
import { User } from "../user";

export enum CategoryType {
    Beatmapsets,
    Users,
}

@Entity()
export class Category extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    ID!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;
    
    @Column()
    maxNominations!: number;
    
    @Column()
    isRequired!: boolean;

    @Column()
    type!: CategoryType;
    
    @ManyToOne(type => ModeDivision, modeDivision => modeDivision.categories, {
        nullable: false,
        eager: true,
    })
    mode!: ModeDivision;

    @ManyToOne(type => MCA, mca => mca.categories, {
        nullable: false,
        eager: true,
    })
    mca!: MCA;

    @OneToMany(type => Nomination, nomination => nomination.category)
    nominations!: Nomination[];
    
    @OneToMany(type => Vote, vote => vote.category)
    votes!: Vote[];

    public getInfo = function(this: Category): CategoryInfo {
        return {
            id: this.ID,
            name: this.name,
            description: this.description,
            maxNominations: this.maxNominations,
            isRequired: this.isRequired,
            type: CategoryType[this.type],
            mode: this.mode.name,
        };
    }
}

export interface CategoryStageInfo extends CategoryInfo {
    count: number;
}

export interface CategoryInfo {
    id: number;
    name: string;
    description: string;
    maxNominations: number;
    isRequired: boolean;
    type: string;
    mode: string;
}

export class CategoryGenerator {
    /**
     * Creates a grand award.
     */
    public createGrandAward = function(mca: MCA, mode: ModeDivision, type: CategoryType): Category {
        const category = new Category;
        
        category.name = "Grand Award";
        category.description = "The best of the best.";
        category.maxNominations = 1;
        category.isRequired = true;
        category.type = type;
        category.mode = mode;
        category.mca = mca;

        return category;
    }

    /**
     * Creates a regular award.
     */
    public create = function(name: string, desc: string, type: CategoryType, mca: MCA, mode: ModeDivision): Category {
        const category = new Category;
        
        category.name = name;
        category.description = desc;
        category.maxNominations = 3;
        category.isRequired = true;
        category.type = type;
        category.mode = mode;
        category.mca = mca;

        return category;
    }
}