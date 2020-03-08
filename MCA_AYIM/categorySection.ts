import { Entity, BaseEntity, Column, OneToMany, PrimaryColumn } from "typeorm";
import { Category } from "./category";

@Entity()
export class CategorySection extends BaseEntity {
    
    @PrimaryColumn()
    ID!: number;

    @Column()
    name!: string;

    @OneToMany(type => Category, category => category.section)
    categories!: Category[];

}

export enum CategorySectionType {
    Beatmapsets = 1,
    Users,
}
