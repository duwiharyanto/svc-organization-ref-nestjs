import { ApiProperty } from "@nestjs/swagger";

export class UpdateLocationDto {
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