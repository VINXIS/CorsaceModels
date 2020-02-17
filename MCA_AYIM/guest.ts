import { Entity, Column, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "../user";
import { Modes } from "./mode";

@Entity()
export class Guest extends BaseEntity {

    @PrimaryColumn({ type: "year" })
    year: number;

    @Column()
    mode: Modes;

    @Column()
    accepted: Status;

    @ManyToOne(type => User, user => user.mca)
    user: User;

}

export enum Status {
    Pending,
    Accepted,
    Rejected
}
