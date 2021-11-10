import { ApiProperty } from "@nestjs/swagger";

export class SingleTenureDto {

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  flag_aktif: number;

  @ApiProperty()
  user_input: string;

  @ApiProperty()
  tgl_input: Date;

  @ApiProperty()
  user_update: string;

  @ApiProperty()
  tgl_update: Date;

  @ApiProperty()
  nama_periode_jabatan: string;

  @ApiProperty()
  periode_mulai: string;

  @ApiProperty()
  periode_selesai: string;

  @ApiProperty()
  tanggal_periode_mulai: Date;

  @ApiProperty()
  tanggal_periode_mulai_label: string;

  @ApiProperty()
  tanggal_periode_selesai: Date;

  @ApiProperty()
  tanggal_periode_selesai_label: string
}