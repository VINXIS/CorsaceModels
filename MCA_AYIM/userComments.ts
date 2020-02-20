import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user';

@Entity()
export class UserComment extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    comment: string;

    @Column({ default: false })
    isValid: boolean;

    @Column()
    mode: ModeDivision;
    
    @Column()
    commenterID: number;

    @ManyToOne(type => User, user => user.commentsMade, { nullable: false })
    commenter: User;

    @ManyToOne(type => User, user => user.commentsReceived, { nullable: false })
    target: User;

    @ManyToOne(type => User, user => user.reviews)
    reviewer: User;

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    updatedOn: Date;

}

export enum ModeDivision {
    'standard',
    'taiko',
    'fruits',
    'mania',
    'storyboard'
}
