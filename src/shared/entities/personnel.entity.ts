import { Exclude } from "class-transformer";
import { BeforeInsert, Column, CreateDateColumn, Entity, Generated, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("pegawai")
export class PersonnelEntity {
  @Exclude({ toPlainOnly: true })
  @PrimaryColumn({ type: "bigint", unsigned: true })
  id: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: "bigint", width: 20 })
  id_personal_data_pribadi: string;

  @Column({ type: "varchar", length: 254 })
  nama: string;

  @Column({ type: "varchar", length: 9 })
  nik: string;

  @Column({ type: "varchar", length: 100 })
  gelar_depan: string;

  @Column({ type: "varchar", length: 100 })
  gelar_belakang: string;

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