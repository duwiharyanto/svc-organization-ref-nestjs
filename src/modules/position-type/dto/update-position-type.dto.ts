import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdatePositionTypeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nama: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nama_en: string;

  @ApiProperty()
  @IsString()
  nama_singkat: string;

  @ApiProperty()
  @IsString()
  nama_singkat_en: string;
}