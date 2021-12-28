import { BadRequestException } from '@nestjs/common';

export class TenureBadRequestException extends BadRequestException {
  constructor(id: string) {
    super(`Periode jabatan dengan uuid ${id} tidak ditemukan.`);
  }
}

export default TenureBadRequestException

