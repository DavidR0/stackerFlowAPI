import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("session_ID_uindex", ["id"], { unique: true })
@Entity("session", { schema: "stackerflow" })
export class Session {
  @Column("varchar", { name: "JwtToken", length: 255 })
  jwtToken: string;

  @Column("tinyint", { name: "Valid", width: 1, default: () => "'1'" })
  valid: boolean;

  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;
}
