import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

export interface sessionDTO{
  id?: number,
  jwtToken?: string,
  valid?: boolean
  userId?: number,
};

@Index("session_ID_uindex", ["id"], { unique: true })
@Index("session_user_User_ID_fk", ["userId"], {})
@Entity("session", { schema: "stackerflow" })
export class Session {
  @Column("varchar", { name: "JwtToken", length: 1520 })
  jwtToken: string;

  @Column("tinyint", { name: "Valid", width: 1, default: () => "'1'" })
  valid: boolean;

  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "User_ID", nullable: true })
  userId: number | null;

  @ManyToOne(() => User, (user) => user.sessions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "User_ID", referencedColumnName: "userId" }])
  user: User;
}
