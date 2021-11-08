import { NotFoundException } from '@nestjs/common';

export class UnitTypeNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Jenis unit dengan uuid ${id} tidak ditemukan`);
  }
}

export default UnitTypeNotFoundException
