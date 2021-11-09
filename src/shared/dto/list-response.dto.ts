import { ApiProperty } from "@nestjs/swagger";

export class ListResponseDto {
  @ApiProperty()
  data: Array<Object>;

  @ApiProperty()
  count: number;

  @ApiProperty()
  total: number;
}