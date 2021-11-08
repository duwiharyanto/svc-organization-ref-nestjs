import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("jenis_unit")
export class UnitTypeEntity {

  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: string;

  @Column({type: "varchar", length: 128})
  @Generated('uuid')
  uuid: string;

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

  @Column({ type: "varchar", length: 128 })
  nama: string;

  @Column({ type: "varchar", length: 128 })
  nama_en: string;

  @Column({ type: "varchar", length: 64, nullable: true })
  nama_singkat: string;

  @Column({ type: "varchar", length: 64, nullable: true })
  nama_singkat_en: string;

  // @BeforeInsert()
  // setIdValue() {
  //   this.uuid = 
  // }
}