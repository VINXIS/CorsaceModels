
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, OneToOne, JoinColumn, JoinTable } from "typeorm";
import { DemeritReport } from "./demerits";
import { Eligibility } from "./MCA_AYIM/eligibility";
import { GuestRequest } from "./MCA_AYIM/guestRequest";
import { UserComment } from "./MCA_AYIM/userComments";
import { Nomination } from "./MCA_AYIM/nomination";
import { Vote } from "./MCA_AYIM/vote";

export class OAuth {

    @Column({ default: "" })
    userID!: string;

    @Column({ default: "" })
    username!: string;
    
    @Column({ default: "" })
    avatar!: string;

    @Column({ type: "longtext", default: "" })
    accessToken!: string;

    @Column({ type: "longtext", default: "" })
    refreshToken!: string;

    @CreateDateColumn()
    dateAdded!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    lastVerified!: Date;

}

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    ID!: number;

    @Column(type => OAuth)
    discord!: OAuth;
    
    @Column(type => OAuth)
    osu!: OAuth;

    @CreateDateColumn()
    registered!: Date;
    
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    lastLogin!: Date;

    @OneToMany(type => DemeritReport, demerit => demerit.user)
    demerits!: DemeritReport[];

    @OneToOne(type => GuestRequest, guestRequest => guestRequest.user, {
        eager: true,
    })
    @JoinColumn()
    guestRequest!: GuestRequest;

    @OneToMany(type => Eligibility, eligibility => eligibility.user, {
        eager: true,
    })
    @JoinTable()
    mca!: Eligibility[];

    @OneToMany(type => UserComment, userComment => userComment.commenter)
    commentsMade!: UserComment[];

    @OneToMany(type => UserComment, userComment => userComment.target)
    commentsReceived!: UserComment[];

    @OneToMany(type => UserComment, userComment => userComment.reviewer)
    reviews!: UserComment[];

    @Column({ default: true })
    canComment!: boolean;
    
    @OneToMany(type => Nomination, nomination => nomination.nominator)
    nominations!: Nomination[];
    
    @OneToMany(type => Nomination, nomination => nomination.user)
    nominationsReceived!: Nomination[];

    @OneToMany(type => Vote, vote => vote.voter)
    votes!: Vote[];
    
    @OneToMany(type => Vote, vote => vote.user)
    votesReceived!: Vote[];
    
    public getInfo = function(this: User): UserInfo {
        const info: UserInfo = {
            corsaceID: this.ID,
            discord: {
                avatar: "https://cdn.discordapp.com/avatars/" + this.discord.userID + "/" + this.discord.avatar + ".png",
                userID: this.discord.userID,
                username: this.discord.username,
            },
            osu: {
                avatar: this.osu.avatar,
                userID: this.osu.userID,
                username: this.osu.username,
            },
            joinDate: this.registered,
            lastLogin: this.lastLogin,
            mca: this.mca,
            guestReq: this.guestRequest,
        };
        return info;
    }
}

export class UserInfo {
    corsaceID!: number;
    discord!: {
        avatar: string;
        userID: string;
        username: string;
    };
    osu!: {
        avatar: string;
        userID: string;
        username: string;
    };
    joinDate!: Date;
    lastLogin!: Date;
    mca!: Eligibility[];
    guestReq!: GuestRequest;
}