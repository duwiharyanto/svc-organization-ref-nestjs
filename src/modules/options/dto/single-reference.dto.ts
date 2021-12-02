import { ApiProperty } from "@nestjs/swagger";

export class SingleReferenceDto {
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
  kode: string;

  @ApiProperty()
  label: string;

  @ApiProperty()
  kelompok: string;

  @ApiProperty()
  no_urut: number;
}