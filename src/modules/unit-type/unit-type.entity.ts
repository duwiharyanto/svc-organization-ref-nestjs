import { Exclude } from "class-transformer";
import { BeforeInsert, Column, CreateDateColumn, Entity, Generated, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("jenis_unit")
export class UnitTypeEntity {

  @Exclude({ toPlainOnly: true })
  @PrimaryColumn({ type: "bigint", unsigned: true })
  id: string;

  @Column({ type: "varchar", length: 128 })
  nama_jenis_unit: string;

  @Column({ type: "varchar", length: 128 })
  nama_jenis_unit_en: string;

  @Column({ type: "varchar", length: 64, nullable: true })
  nama_singkat_jenis_unit: string;

  @Column({ type: "varchar", length: 64, nullable: true })
  nama_singkat_jenis_unit_en: string;

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