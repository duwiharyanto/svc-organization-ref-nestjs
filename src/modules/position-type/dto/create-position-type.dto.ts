import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePositionTypeDto {
  @ApiProperty({
    example: 'testing',
    description: 'Test'
  })
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

  user_input: string;
}