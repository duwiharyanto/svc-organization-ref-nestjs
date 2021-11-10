import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdatePositionTypeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nama_jenis_jabatan: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nama_jenis_jabatan_en: string;

  @ApiProperty()
  @IsString()
  nama_singkat_jenis_jabatan: string;

  @ApiProperty()
  @IsString()
  nama_singkat_jenis_jabatan_en: string;
}