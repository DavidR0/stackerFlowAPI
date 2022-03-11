import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./Question";
import { User } from "./User";

@Index("question answer_Answer_ID_uindex", ["answerId"], { unique: true })
@Index("question answer_question_Question_ID_fk", ["questionId"], {})
@Index("question answer_user_User_ID_fk", ["userId"], {})
@Entity("answer", { schema: "stackerflow" })
export class Answer {
  @PrimaryGeneratedColumn({ type: "int", name: "Answer_ID" })
  answerId: number;

  @Column("int", { name: "Question_ID", nullable: true })
  questionId: number | null;

  @Column("int", { name: "User_ID", nullable: true })
  userId: number | null;

  @Column("varchar", { name: "Author", length: 255 })
  author: string;

  @Column("varchar", { name: "Content", length: 10000 })
  content: string;

  @Column("int", { name: "VoteCount", nullable: true, default: () => "'0'" })
  voteCount: number | null;

  @Column("timestamp", {
    name: "CreationTime",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  creationTime: Date | null;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Question_ID", referencedColumnName: "questionId" }])
  question: Question;

  @ManyToOne(() => User, (user) => user.answers, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "User_ID", referencedColumnName: "userId" }])
  user: User;
}
