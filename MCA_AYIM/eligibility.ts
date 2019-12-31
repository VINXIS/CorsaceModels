import { Entity, Column, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "../user";

@Entity()
export class Eligibility extends BaseEntity {

    @PrimaryColumn({ type: "year" })
    year: number;

    @Column({ default: false })
    standard: boolean;

    @Column({ default: false })
    taiko: boolean;

    @Column({ default: false })
    fruits: boolean;

    @Column({ default: false })
    mania: boolean;

    @Column({ default: false })
    storyboard: boolean;

    @ManyToOne(type => User, user => user.mca)
    user: User;

}
