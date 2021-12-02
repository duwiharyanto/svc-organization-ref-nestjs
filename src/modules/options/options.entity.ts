import { Exclude } from "class-transformer";
import { BeforeInsert, Column, CreateDateColumn, Entity, Generated, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("referensi")
export class ReferensiEntity {
  @Exclude({ toPlainOnly: true })
  @PrimaryColumn({ type: "bigint", unsigned: true })
  id: string;

  @Column({ type: "varchar", length: 12 })
  kode: string;

  @Column({ type: "text" })
  label: string;

  @Column({ type: "varchar", length: 128 })
  kelompok: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: "int", width: 11 })
  no_urut: string;

  @Column({ type: "int", width: 1, default: 1 })
  flag_aktif: number;

  @Column({ type: "varchar", length: 15, default: "System" })
  user_input: string;

  @CreateDateColumn()
  tgl_input: Date;

  @Column({ type: "varchar", length: 15, nullable: true })
  user_update: string;

  @UpdateDateColumn()
  tgl_update: Date;

  @Column({type: "varchar", length: 128})
  @Generated('uuid')
  uuid: string;

  @BeforeInsert()
  setNewId() {
    this.id = "0";
  }
}