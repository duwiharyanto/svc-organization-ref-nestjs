import { ApiProperty } from "@nestjs/swagger";

export class CreateTenureDto {
  @ApiProperty()
  periode_mulai: number;

  @ApiProperty()
  periode_selesai: number;

  nama: string;

  @ApiProperty()
  tanggal_periode_mulai: Date;

  @ApiProperty()
  tanggal_periode_selesai: Date;
}