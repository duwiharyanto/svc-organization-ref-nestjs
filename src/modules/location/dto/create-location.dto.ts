import { ApiProperty } from "@nestjs/swagger";

export class CreateLocationDto {
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