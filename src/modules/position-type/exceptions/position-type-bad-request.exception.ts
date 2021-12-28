import { BadRequestException } from '@nestjs/common';

export class PositionTypeBadRequestException extends BadRequestException {
  constructor(id: string) {
    super(`Jenis jabatan dengan uuid ${id} tidak ditemukan.`);
  }
}

export default PositionTypeBadRequestException
