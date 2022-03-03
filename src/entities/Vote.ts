import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { VoteItemType } from "./VoteItemType";

@Index("vote_Vote_ID_uindex", ["voteId"], { unique: true })
@Index("vote_user_User_ID_fk", ["userId"], {})
@Index("vote_vote_item_type_ID_fk", ["itemId"], {})
@Entity("vote", { schema: "stackerflow" })
export class Vote {
  @PrimaryGeneratedColumn({ type: "int", name: "Vote_ID" })
  voteId: number;

  @Column("int", { name: "User_ID" })
  userId: number;

  @Column("int", { name: "Item_ID", nullable: true })
  itemId: number | null;

  @Column("enum", { name: "Type", enum: ["up", "down"] })
  type: "up" | "down";

  @ManyToOne(() => User, (user) => user.votes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "User_ID", referencedColumnName: "userId" }])
  user: User;

  @ManyToOne(() => VoteItemType, (voteItemType) => voteItemType.votes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Item_ID", referencedColumnName: "id" }])
  item: VoteItemType;
}
