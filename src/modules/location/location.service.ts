import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusDataDto } from 'src/shared/dto/status-data.dto';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationBadRequestException } from './exceptions/location-bad-request.exception';
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

  async readLocation(uuid?: string): Promise<any> {
    if (uuid) {
      const location = await this.locationRepository.findOne({where: {uuid: uuid}});
      if (location) {
        return { 
          data: [location] 
        };
      }
      throw new LocationBadRequestException(uuid);
    } else {
      const locations = await this.locationRepository.find();
      const locationsCount = await this.locationRepository.count();
      return {
        data: locations,
        count: locationsCount
      };
    }
  }

  async updateLocation(uuid: string, location: UpdateLocationDto | StatusDataDto): Promise<any> {
    const findLocation = await this.locationRepository.findOne({where: {uuid: uuid}});
    await this.locationRepository.update(findLocation.id, location);
    const updatedLocation = await this.locationRepository.findOne(findLocation.id);
    if (updatedLocation) {
      return {
        message: 'Data berhasil diubah',
        data: [updatedLocation]
      };
    }
    throw new LocationBadRequestException(uuid);
  }

  async deleteLocation(uuid: string): Promise<void> {
    const findLocation = await this.locationRepository.findOne({where: {uuid: uuid}});
    const deleteResponse = await this.locationRepository.softDelete(findLocation.id);
    if (!deleteResponse.affected) {
      throw new LocationBadRequestException(uuid);
    }
  }

}
