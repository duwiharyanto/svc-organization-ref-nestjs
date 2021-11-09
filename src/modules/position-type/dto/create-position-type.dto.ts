import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePositionTypeDto {
  @ApiProperty({
    example: 'testing',
    description: 'Test'
  })
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