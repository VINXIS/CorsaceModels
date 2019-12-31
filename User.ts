import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from "typeorm";
import { DemeritReport } from "./demerits";
import { Eligibility } from "./MCA_AYIM/eligibility";

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

    @OneToMany(type => DemeritReport, demerit => demerit.user)
    demerits: DemeritReport[];

    @OneToMany(type => Eligibility, eligibility => eligibility.user)
    mca: Eligibility[];

    public getInfo = function(this: User): UserInfo {
        const info: UserInfo = {
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
        }
        return info
    }
}

export class OAuth {

    @Column({ default: "" })
    userID: string;

    @Column({ default: "" })
    username: string;
    
    @Column({ default: "" })
    avatar: string;

    @Column({ type: "longtext", default: "" })
    accessToken: string;

    @Column({ type: "longtext", default: "" })
    refreshToken: string;

    @CreateDateColumn()
    dateAdded: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    lastVerified: Date;

}

export class UserInfo {
    discord: {
        avatar: string,
        userID: string,
        username: string,
    };
    osu: {
        avatar: string,
        userID: string,
        username: string,
    }
    joinDate: Date;
    lastLogin: Date;
    mca: Eligibility[];
}
