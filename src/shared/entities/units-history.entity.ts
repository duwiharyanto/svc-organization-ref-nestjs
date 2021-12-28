import { Exclude } from "class-transformer";
import { BeforeInsert, Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('riwayat_unit')
export class UnitHistoryEntity {
  
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: string;

  @Column({ type: "bigint", width: 20 })
  id_unit: string;

  @Column({ type: "varchar", length: 6 })
  kd_unit: string;

  @Column({ type: "bigint", width: 20 })
  id_jenis_unit: string;

  @Column({ type: "varchar", length: 128 })
  nama_unit: string;

  @Column({ type: "varchar", length: 128 })
  nama_unit_en: string;

  @Column({ type: "varchar", length: 64 })
  nama_singkat_unit: string;

  @Column({ type: "varchar", length: 64 })
  nama_singkat_unit_en: string;

  @Column({ type: "varchar", length: 128 })
  nama_unit_pddikti: string;

  @Column({ type: "varchar", length: 16 })
  kd_homebase: string;

  @Column({ type: "varchar", length: 16 })
  kd_homebase_pddikti: string;

  @Column({ type: "bigint", width: 20 })
  id_lokasi: string;

  @Column({ type: "bigint", width: 20 })
  id_surat_keputusan: string;

  @Column({ type: "bigint", width: 20 })
  id_akreditasi: string;

  @Column({ type: "bigint", width: 20 })
  id_dokumen_akreditasi: string;

  @Column({ type: "bigint", width: 20 })
  id_referensi: string;

  @Column({ type: "varchar", length: 64 })
  kd_alasan_perubahan: string;

  @Column({ type: "int", width: 1, default: 0 })
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