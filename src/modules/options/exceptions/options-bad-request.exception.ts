import { BadRequestException } from '@nestjs/common';

export class OptionsBadRequestException extends BadRequestException {
  constructor(id: string) {
    super(`Data referensi dengan uuid ${id} tidak ditemukan`);
  }
}

export default OptionsBadRequestException
