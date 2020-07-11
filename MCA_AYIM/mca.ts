import { Entity, Column, BaseEntity, PrimaryColumn, OneToMany } from "typeorm";
import { Category } from "./category";

export class Phase {

    @Column({ type: "timestamp" })
    Start!: Date;

    @Column({ type: "timestamp" })
    End!: Date;

}

@Entity()
export class MCA extends BaseEntity {

    @PrimaryColumn({ type: "year" })
    year!: number;

    @Column(type => Phase)
    nomination!: Phase;

    @Column(type => Phase)
    voting!: Phase;

    @Column(type => Phase)
    results!: Phase;

    @OneToMany(type => Category, category => category.mca)
    categories!: Category[];

}
