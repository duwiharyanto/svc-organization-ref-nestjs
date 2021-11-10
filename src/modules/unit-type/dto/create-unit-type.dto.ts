import { ApiProperty } from "@nestjs/swagger";

export class CreateUnitTypeDto {
  @ApiProperty()
  nama_jenis_unit: string;

  @ApiProperty()
  nama_jenis_unit_en: string;

  @ApiProperty()
  nama_singkat_jenis_unit: string;

  @ApiProperty()
  nama_singkat_jenis_unit_en: string;
}