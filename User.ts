import {Entity, PrimaryColumn, Column, BaseEntity, OneToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(type => OAuth)
    discord: OAuth;
    
    @Column(type => OAuth)
    osu: OAuth;

    @CreateDateColumn()
    registered: Date;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    lastLogin: Date;

}

export class OAuth {

    @Column({ default: "" })
    userID: string;

    @Column({ default: "" })
    username: string;
    
    @Column({ default: "" })
    avatar: string;

    @Column({ default: "" })
    accessToken: string;

    @Column({ default: "" })
    refreshToken: string;

    @CreateDateColumn()
    dateAdded: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    lastVerified: Date;

}
