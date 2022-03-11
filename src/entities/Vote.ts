import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("vote_Vote_ID_uindex", ["voteId"], { unique: true })
@Index("vote_vote_item_type_ID_fk", ["itemId"], {})
@Index("vote_user_User_ID_fk", ["userId"], {})
@Entity("vote", { schema: "stackerflow" })
export class Vote {
  @PrimaryGeneratedColumn({ type: "int", name: "Vote_ID" })
  voteId: number;

  @Column("int", { name: "User_ID" })
  userId: number;

  @Column("int", { name: "Item_ID", nullable: true })
  itemId: number | null;

  @Column("enum", { name: "VoteType", enum: ["up", "down"] })
  voteType: "up" | "down";

  @Column("enum", { name: "ItemType", enum: ["question", "answer"] })
  itemType: "question" | "answer";

  @ManyToOne(() => User, (user) => user.votes, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "User_ID", referencedColumnName: "userId" }])
  user: User;
}
