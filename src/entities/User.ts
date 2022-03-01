import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./Question";
import { QuestionAnswer } from "./QuestionAnswer";
import { Vote } from "./Vote";

@Index("User_User_ID_uindex", ["userId"], { unique: true })
@Entity("user", { schema: "stackerflow" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "User_ID" })
  userId: number;

  @Column("enum", {
    name: "Type",
    nullable: true,
    enum: ["User", "Admin"],
    default: () => "'User'",
  })
  type: "User" | "Admin" | null;

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

  @Column("varchar", { name: "privateKey", nullable: true, length: 512 })
  privateKey: string | null;

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[];

  @OneToMany(() => QuestionAnswer, (questionAnswer) => questionAnswer.user)
  questionAnswers: QuestionAnswer[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];
}
