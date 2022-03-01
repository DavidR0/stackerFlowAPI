import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { QuestionAnswer } from "./QuestionAnswer";
import { QuestionTag } from "./QuestionTag";
import { Vote } from "./Vote";

@Index("Question_Question_ID_uindex", ["questionId"], { unique: true })
@Index("question_user_User_ID_fk", ["userId"], {})
@Entity("question", { schema: "stackerflow" })
export class Question {
  @PrimaryGeneratedColumn({ type: "int", name: "Question_ID" })
  questionId: number;

  @Column("int", { name: "User_ID", nullable: true })
  userId: number | null;

  @Column("varchar", { name: "Author", length: 255 })
  author: string;

  @Column("varchar", { name: "Title", length: 255 })
  title: string;

  @Column("varchar", { name: "Content", length: 10000 })
  content: string;

  @Column("timestamp", {
    name: "CreationTime",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  creationTime: Date | null;

  @Column("tinyint", {
    name: "Deleted",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  deleted: boolean | null;

  @Column("int", { name: "VoteCount", nullable: true, default: () => "'0'" })
  voteCount: number | null;

  @ManyToOne(() => User, (user) => user.questions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "User_ID", referencedColumnName: "userId" }])
  user: User;

  @OneToMany(() => QuestionAnswer, (questionAnswer) => questionAnswer.question)
  questionAnswers: QuestionAnswer[];

  @OneToMany(() => QuestionTag, (questionTag) => questionTag.question)
  questionTags: QuestionTag[];

  @OneToMany(() => Vote, (vote) => vote.question)
  votes: Vote[];
}
