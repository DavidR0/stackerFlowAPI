import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vote } from "./Vote";

@Index("vote_item_type_ID_uindex", ["id"], { unique: true })
@Entity("vote_item_type", { schema: "stackerflow" })
export class VoteItemType {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("enum", {
    name: "Type",
    nullable: true,
    enum: ["question", "answer"],
  })
  type: "question" | "answer" | null;

  @Column("int", { name: "Item_ID", nullable: true })
  itemId: number | null;

  @OneToMany(() => Vote, (vote) => vote.item)
  votes: Vote[];
}
