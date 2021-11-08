import { ApiProperty } from "@nestjs/swagger";

export class CreateUnitTypeDto {
  @ApiProperty()
  nama: string;

  @ApiProperty()
  nama_en: string;

  @ApiProperty()
  nama_singkat: string;

  @ApiProperty()
  nama_singkat_en: string;
}