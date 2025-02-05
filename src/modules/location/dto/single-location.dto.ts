import { ApiProperty } from "@nestjs/swagger";

export class SingleLocationDto {
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
  nama: string;

  @ApiProperty()
  nama_gedung: string;

  @ApiProperty()
  keterangan: string;

  @ApiProperty()
  alamat: string;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;
}