import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusDataDto } from 'src/shared/dto/status-data.dto';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import LocationNotFoundException from './exceptions/location-not-found.exception';
import { LocationEntity } from './location.entity';

@Injectable()
export class LocationService {

  constructor(
    @InjectRepository(LocationEntity) private locationRepository: Repository<LocationEntity>
  ) {}

  async createLocation(location: CreateLocationDto) {
    const newLocation = await this.locationRepository.create(location);
    await this.locationRepository.save(newLocation);
    return {
      message: 'Data berhasil ditambah',
      data: [newLocation]
    };
  }

  async readLocation(id?: string): Promise<any> {
    if (id) {
      const location = await this.locationRepository.findOne(id);
      if (location) {
        return { 
          data: [location] 
        };
      }
      throw new LocationNotFoundException(id);
    } else {
      const locations = await this.locationRepository.find();
      const locationsCount = await this.locationRepository.count();
      return {
        data: locations,
        count: locationsCount
      };
    }
  }

  async updateLocation(id: string, location: UpdateLocationDto | StatusDataDto): Promise<any> {
    await this.locationRepository.update(id, location);
    const updatedLocation = await this.locationRepository.findOne(id);
    if (updatedLocation) {
      return {
        message: 'Data berhasil diubah',
        data: [updatedLocation]
      };
    }
    throw new LocationNotFoundException(id);
  }

  async deleteLocation(id: string): Promise<void> {
    const deleteResponse = await this.locationRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new LocationNotFoundException(id);
    }
  }

}
