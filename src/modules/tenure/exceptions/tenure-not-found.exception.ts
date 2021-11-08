import { NotFoundException } from '@nestjs/common';

export class TenureNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Periode jabatan dengan uuid ${id} tidak ditemukan`);
  }
}

export default TenureNotFoundException

