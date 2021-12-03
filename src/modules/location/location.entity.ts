import { Exclude } from "class-transformer";
import { BeforeInsert, Column, CreateDateColumn, Entity, Generated, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("lokasi")
export class LocationEntity {
  
  @Exclude({ toPlainOnly: true })
  @PrimaryColumn({ type: "bigint", unsigned: true })
  id: string;

  @Column({ type: "varchar", length: 255 })
  nama: string;

  @Column({ type: "text" })
  nama_gedung: string;

  @Column({ type: "varchar", length: 128, nullable: true })
  keterangan: string;

  @Column({ type: "varchar", length: 225 })
  alamat: string;

  @Column({ type: "varchar", length: 64 })
  latitude: number;

  @Column({ type: "varchar", length: 64 })
  longitude: number;

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