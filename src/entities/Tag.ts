import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { QuestionTag } from "./QuestionTag";

@Index("Tag_Tag_uindex", ["tag"], { unique: true })
@Index("Tag_tag_ID_uindex", ["tagId"], { unique: true })
@Entity("tag", { schema: "stackerflow" })
export class Tag {
  @PrimaryGeneratedColumn({ type: "int", name: "Tag_ID" })
  tagId: number;

  @Column("varchar", { name: "Tag", unique: true, length: 255 })
  tag: string;

  @OneToMany(() => QuestionTag, (questionTag) => questionTag.tag)
  questionTags: QuestionTag[];
}
