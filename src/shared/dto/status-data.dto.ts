import { ApiProperty } from "@nestjs/swagger";

export class StatusDataDto {
  @ApiProperty()
  flag_aktif: number;

  user_update: string;
}