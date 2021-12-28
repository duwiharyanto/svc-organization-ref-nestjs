import { Exclude } from "class-transformer";
import { BeforeInsert, Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('pejabat_organisasi')
export class OfficerEntity {
  
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: "bigint", width: 20 })
  id_struktur_organisasi: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: "bigint", width: 20 })
  id_jenis_jabatan: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: "bigint", width: 20 })
  id_unit: string;

  @Column({ type: "varchar", length: 256 })
  nama_jabatan: string;

  @Column({ type: "varchar", length: 256 })
  nama_jabatan_en: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: "bigint", width: 20 })
  id_pegawai: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: "bigint", width: 20 })
  id_personal_data_pribadi: string;

  @Column({ type: "varchar", length: 256 })
  nama_pejabat: string;

  @Column({ type: "varchar", length: 9 })
  nik: string;

  @Column({ type: "varchar", length: 100 })
  email: string;

  @Column({ type: "varchar", length: 14 })
  no_handphone: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: "bigint", width: 20 })
  id_periode_jabatan: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: "bigint", width: 20 })
  id_surat_keputusan: string;

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