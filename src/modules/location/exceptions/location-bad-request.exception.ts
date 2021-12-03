import { BadRequestException, HttpStatus } from '@nestjs/common';

export class LocationBadRequestException extends BadRequestException {
  constructor(id: string) {
    super(`Lokasi dengan uuid ${id} tidak ditemukan`);
  }
}

export default LocationBadRequestException
