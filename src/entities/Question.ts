import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Answer } from "./Answer";
import { User } from "./User";
import { QuestionTag } from "./QuestionTag";


@Index("Question_Question_ID_uindex", ["questionId"], { unique: true })
@Index("question_user_User_ID_fk", ["userId"], {})
@Entity("question", { schema: "stackerflow" })
export class Question {
  @PrimaryGeneratedColumn({ type: "int", name: "Question_ID" })
  questionId: number;

  @Column("int", { name: "User_ID", nullable: false })
  userId: number;

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

  @Column("int", { name: "VoteCount", nullable: false, default: () => "'0'" })
  voteCount: number;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @ManyToOne(() => User, (user) => user.questions, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "User_ID", referencedColumnName: "userId" }])
  user: User;

  @OneToMany(() => QuestionTag, (questionTag) => questionTag.question)
  questionTags: QuestionTag[];
}
