import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "../user";
import { Beatmapset } from "./beatmapset";
import { Category } from "./category";

@Entity()
export class Nomination extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    ID!: number;

    @ManyToOne(type => User, user => user.nominations, {
        nullable: false,
    })
    nominator!: User;
    
    @ManyToOne(type => Category, category => category.nominations, {
        nullable: false,
    })
    category!: Category;

    @Column({ nullable: true })
    userID?: number;

    @ManyToOne(type => User, user => user.nominationsReceived)
    user?: User;

    @Column({ nullable: true })
    beatmapsetID?: number;

    @ManyToOne(type => Beatmapset, Beatmapset => Beatmapset.nominationsReceived)
    beatmapset?: Beatmapset;

    @Column({ default: false })
    isValid!: boolean;
    
    @ManyToOne(type => User, user => user.nominationReviews)
    reviewer!: User;

    @Column()
    lastReviewedAt!: Date;
}
