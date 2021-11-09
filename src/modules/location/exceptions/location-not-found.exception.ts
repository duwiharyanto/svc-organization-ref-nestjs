import { NotFoundException } from '@nestjs/common';

export class LocationNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Lokasi dengan uuid ${id} tidak ditemukan`);
  }
}

export default LocationNotFoundException
