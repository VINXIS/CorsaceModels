
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, OneToOne, JoinColumn, JoinTable, ManyToOne } from "typeorm";
import { DemeritReport } from "./demerits";
import { MCAEligibility } from "./MCA_AYIM/mcaEligibility";
import { GuestRequest } from "./MCA_AYIM/guestRequest";
import { UserComment } from "./MCA_AYIM/userComments";
import { UsernameChange } from "./usernameChange";
import { Nomination } from "./MCA_AYIM/nomination";
import { Vote } from "./MCA_AYIM/vote";
import { Beatmapset } from "./MCA_AYIM/beatmapset";
import { discordGuild } from "../CorsaceServer/discord";
import { Config } from "../config";

// General middlewares
const config = new Config();

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

    @OneToMany(type => UsernameChange, change => change.user, {
        eager: true,
    })
    otherNames!: UsernameChange[];

    @OneToMany(type => DemeritReport, demerit => demerit.user, {
        eager: true,
    })
    demerits!: DemeritReport[];

    @OneToOne(type => GuestRequest, guestRequest => guestRequest.user, {
        eager: true,
    })
    @JoinColumn()
    guestRequest!: GuestRequest;

    @OneToMany(type => MCAEligibility, eligibility => eligibility.user, {
        eager: true,
    })
    @JoinTable()
    mcaEligibility!: MCAEligibility[];

    @OneToMany(type => Beatmapset, set => set.creator)
    beatmapsets!: Beatmapset[];

    @OneToMany(type => UserComment, userComment => userComment.commenter)
    commentsMade!: UserComment[];

    @OneToMany(type => UserComment, userComment => userComment.target)
    commentsReceived!: UserComment[];

    @OneToMany(type => UserComment, userComment => userComment.reviewer)
    commentReviews!: UserComment[];

    @OneToMany(type => Nomination, userComment => userComment.reviewer)
    nominationReviews!: Nomination[];

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
    
    public getInfo = async function(this: User): Promise<UserInfo> {
        const member = await discordGuild.fetchMember(this.discord.userID);
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
                otherNames: this.otherNames,
            },
            staff: {
                corsace: member && member.roles.has(config.discord.roles.corsace.corsace),
                headStaff: member && member.roles.has(config.discord.roles.corsace.headStaff),
                staff: member && member.roles.has(config.discord.roles.corsace.staff),
            },
            joinDate: this.registered,
            lastLogin: this.lastLogin,
            guestReq: this.guestRequest,
        };
        return info;
    }

    public getMCAInfo = async function(this: User): Promise<UserMCAInfo> {
        const member = await discordGuild.fetchMember(this.discord.userID);
        const info = await this.getInfo();
        const mcaInfo: UserMCAInfo = {
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
                otherNames: this.otherNames,
            },
            staff: {
                corsace: member && member.roles.has(config.discord.roles.corsace.corsace),
                headStaff: member && member.roles.has(config.discord.roles.corsace.headStaff),
                staff: member && member.roles.has(config.discord.roles.corsace.staff),
            },
            joinDate: this.registered,
            lastLogin: this.lastLogin,
            guestReq: this.guestRequest,
            eligibility: this.mcaEligibility,
            mcaStaff: {
                standard: member && member.roles.has(config.discord.roles.mca.standard),
                taiko: member && member.roles.has(config.discord.roles.mca.taiko),
                fruits: member && member.roles.has(config.discord.roles.mca.fruits),
                mania: member && member.roles.has(config.discord.roles.mca.mania),
                storyboard: member && member.roles.has(config.discord.roles.mca.storyboard),
            },
        };

        return mcaInfo;
    }
}

export interface UserMCAInfo extends UserInfo {
    eligibility: MCAEligibility[];
    mcaStaff: {
        standard: boolean;
        taiko: boolean;
        fruits: boolean;
        mania: boolean;
        storyboard: boolean;
    }
}

export interface UserInfo {
    corsaceID: number;
    discord: {
        avatar: string;
        userID: string;
        username: string;
    };
    osu: {
        avatar: string;
        userID: string;
        username: string;
        otherNames: UsernameChange[];
    };
    staff: {
        corsace: boolean;
        headStaff: boolean;
        staff: boolean;
    };
    joinDate: Date;
    lastLogin: Date;
    guestReq: GuestRequest;
}