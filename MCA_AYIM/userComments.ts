import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user';
import { ModeDivision } from './modeDivision';

@Entity()
export class UserComment extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    ID: number;

    @Column('text')
    comment: string;

    @Column({ default: false })
    isValid: boolean;

    @Column()
    modeID: number;

    @ManyToOne(type => ModeDivision, modeDivision => modeDivision.userComments, { 
        nullable: false,
        eager: true,
    })
    mode: ModeDivision;
    
    @Column()
    commenterID: number;

    @ManyToOne(type => User, user => user.commentsMade, { nullable: false })
    commenter: User;

    @ManyToOne(type => User, user => user.commentsReceived, { nullable: false })
    target: User;

    @ManyToOne(type => User, user => user.reviews)
    reviewer: User;

    @Column()
    lastReviewedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
