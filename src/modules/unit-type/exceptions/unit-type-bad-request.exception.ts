import { BadRequestException } from '@nestjs/common';

export class UnitTypeBadRequestException extends BadRequestException {
  constructor(id: string) {
    super(`Jenis unit dengan uuid ${id} tidak ditemukan.`);
  }
}

export default UnitTypeBadRequestException
