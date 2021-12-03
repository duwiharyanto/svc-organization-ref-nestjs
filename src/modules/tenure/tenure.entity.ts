import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, CreateDateColumn, Entity, Generated, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity("periode_jabatan")
export class TenureEntity {
  
  @Exclude({ toPlainOnly: true })
  @PrimaryColumn({ type: "bigint", unsigned: true })
  id: string;

  @Column({ type: "text" })
  nama_periode_jabatan: string;

  @Column()
  tanggal_periode_mulai: Date;

  @Column()
  tanggal_periode_selesai: Date;

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