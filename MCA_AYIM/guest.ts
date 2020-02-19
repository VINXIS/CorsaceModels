import { Entity, Column, BaseEntity, ManyToOne, PrimaryColumn, OneToOne, JoinTable, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user";
import { Beatmap, Mode } from "./beatmap";

@Entity()
export class GuestRequest extends BaseEntity {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column({ type: "year" })
    year: number;

    @Column()
    mode: Mode;

    @Column()
    accepted: Status;

    @OneToOne(type => User, user => user.guestRequest)
    user: User;

    @ManyToOne(type => Beatmap, beatmap => beatmap.guestRequests, {
        eager: true
    })
    @JoinTable()
    beatmap: Beatmap

}

export enum Status {
    Pending,
    Accepted,
    Rejected
}
