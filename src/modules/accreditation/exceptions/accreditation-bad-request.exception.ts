import { BadRequestException } from '@nestjs/common';

export class AccreditationBadRequestException extends BadRequestException {
  constructor(id: string) {
    super(`Akreditasi dengan uuid ${id} tidak ditemukan`);
  }
}

export default AccreditationBadRequestException
