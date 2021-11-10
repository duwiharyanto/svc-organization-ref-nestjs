import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity("periode_jabatan")
export class TenureEntity {
  
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: string;

  @Column({ type: "text" })
  nama: string;

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
}