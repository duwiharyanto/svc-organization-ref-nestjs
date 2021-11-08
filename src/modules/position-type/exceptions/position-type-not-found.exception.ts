import { NotFoundException } from '@nestjs/common';

export class PositionTypeNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Jenis jabatan dengan uuid ${id} tidak ditemukan`);
  }
}

export default PositionTypeNotFoundException
