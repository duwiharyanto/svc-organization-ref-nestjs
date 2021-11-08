import { ApiProperty } from "@nestjs/swagger";

export class SinglePositionTypeDto {
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
  nama_en: string;

  @ApiProperty()
  nama_singkat: string;

  @ApiProperty()
  nama_singkat_en: string;
}