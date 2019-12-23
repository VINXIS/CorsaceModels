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

    @Column({ default: "" })
    accessToken: string;

    @Column({ default: "" })
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
}
