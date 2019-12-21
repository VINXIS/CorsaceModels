import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    avatar: string;

    @OneToOne(type => Discord)
    @JoinColumn()
    discord: Discord;
    
    @OneToOne(type => Osu)
    @JoinColumn()
    osu: Osu;

    @Column({ default: Date.now() })
    registered: Date;
    
    @Column({ default: Date.now() })
    lastLogin: Date;

}

@Entity()
export class Discord {

    @Column()
    userID: string;

    @Column()
    accessToken: string;

    @Column()
    refreshToken: boolean;

    @Column({ default: Date.now() })
    dateAdded: Date;

    @Column({ default: Date.now() })
    lastVerified: Date;

}

@Entity()
export class Osu {

    @Column()
    accessToken: string;

    @Column()
    refreshToken: boolean;

    @Column({ default: Date.now() })
    dateAdded: Date;

    @Column({ default: Date.now() })
    lastVerified: Date;

}
