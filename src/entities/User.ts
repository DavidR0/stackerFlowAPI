import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Answer } from "./Answer";
import { Question } from "./Question";
import { Session } from "./Session";
import { Vote } from "./Vote";

export interface userDTO{
  userName?: string,
  email?: string,
  password?: string,
  type?: "User" | "Admin" ;
  userID?: number,
  banned?: boolean
  twoFact?: boolean,
  score?: number,
  privateKey?: string,
};


@Index("User_User_ID_uindex", ["userId"], { unique: true })
@Index("user_Email_uindex", ["email"], { unique: true })
@Index("user_UserName_uindex", ["userName"], { unique: true })
@Entity("user", { schema: "stackerflow" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "User_ID" })
  userId: number;

  @Column("enum", {
    name: "Type",
    enum: ["User", "Admin"],
    default: () => "'User'",
  })
  type: "User" | "Admin";

  @Column("tinyint", {
    name: "Banned",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  banned: boolean | null;

  @Column("tinyint", {
    name: "TwoFact",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  twoFact: boolean | null;

  @Column("int", { name: "Score", nullable: true, default: () => "'0'" })
  score: number | null;

  @Column("varchar", { name: "PrivateKey", nullable: true, length: 512 })
  privateKey: string | null;

  @Column("varchar", { name: "Email", unique: true, length: 255 })
  email: string;

  @Column("varchar", { name: "Password", length: 512 })
  password: string;

  @Column("varchar", { name: "UserName", unique: true, length: 255 })
  userName: string;

  @OneToMany(() => Answer, (answer) => answer.user)
  answers: Answer[];

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[];

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];
}
