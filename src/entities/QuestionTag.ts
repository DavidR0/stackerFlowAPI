import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Question } from "./Question";
import { Tag } from "./Tag";

@Index("question_tag_question_Question_ID_fk", ["questionId"], {})
@Index("question_tag_tag_Tag_ID_fk", ["tagId"], {})
@Entity("question_tag", { schema: "stackerflow" })
export class QuestionTag {
  @Column("int", { name: "Tag_ID", nullable: true })
  tagId: number | null;

  @Column("int", { name: "Question_ID", nullable: true })
  questionId: number | null;

  @ManyToOne(() => Question, (question) => question.questionTags, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Question_ID", referencedColumnName: "questionId" }])
  question: Question;

  @ManyToOne(() => Tag, (tag) => tag.questionTags, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Tag_ID", referencedColumnName: "tagId" }])
  tag: Tag;
}
