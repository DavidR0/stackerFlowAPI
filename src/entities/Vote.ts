import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { QuestionAnswer } from "./QuestionAnswer";
import { Question } from "./Question";
import { User } from "./User";

@Index("vote_Vote_ID_uindex", ["voteId"], { unique: true })
@Index("vote_user_User_ID_fk", ["userId"], {})
@Index("vote_question answer_Answer_ID_fk", ["answerId"], {})
@Index("vote_question_Question_ID_fk", ["questionId"], {})
@Entity("vote", { schema: "stackerflow" })
export class Vote {
  @PrimaryGeneratedColumn({ type: "int", name: "Vote_ID" })
  voteId: number;

  @Column("int", { name: "Question_ID", nullable: true })
  questionId: number | null;

  @Column("int", { name: "Answer_ID", nullable: true })
  answerId: number | null;

  @Column("int", { name: "User_ID", nullable: true })
  userId: number | null;

  @Column("enum", {
    name: "Type",
    nullable: true,
    enum: ["up", "down", "neutral"],
    default: () => "'neutral'",
  })
  type: "up" | "down" | "neutral" | null;

  @ManyToOne(() => QuestionAnswer, (questionAnswer) => questionAnswer.votes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Answer_ID", referencedColumnName: "answerId" }])
  answer: QuestionAnswer;

  @ManyToOne(() => Question, (question) => question.votes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Question_ID", referencedColumnName: "questionId" }])
  question: Question;

  @ManyToOne(() => User, (user) => user.votes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "User_ID", referencedColumnName: "userId" }])
  user: User;
}
