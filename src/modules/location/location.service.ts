import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusDataDto } from 'src/shared/dto/status-data.dto';
import { UnitEntity } from 'src/shared/entities/unit.entity';
import { UnitHistoryEntity } from 'src/shared/entities/units-history.entity';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationBadRequestException } from './exceptions/location-bad-request.exception';
import { LocationEntity } from './location.entity';

@Injectable()
export class LocationService {

  constructor(
    @InjectRepository(LocationEntity) private locationRepository: Repository<LocationEntity>,
    @InjectRepository(UnitHistoryEntity) private unitHistoryRepository: Repository<UnitHistoryEntity>,
    @InjectRepository(UnitEntity) private unitRepository: Repository<UnitEntity>
  ) {}

  async createLocation(location: CreateLocationDto) {
    const newLocation = await this.locationRepository.create(location);
    await this.locationRepository.save(newLocation);
    return {
      message: 'Data berhasil ditambah',
      data: [newLocation]
    };
  }

  async readLocation(args: any, uuid?: string): Promise<any> {
    if (uuid) {
      const location = await this.locationRepository.findOne({where: {uuid: uuid}});
      if (location) {
        return { 
          data: [{
            nama: location.nama,
            nama_gedung: location.nama_gedung,
            keterangan: location.keterangan,
            alamat: location.alamat,
            latitude: location.latitude,
            longitude: location.longitude,
            flag_aktif: location.flag_aktif,
            user_input: location.user_input,
            tgl_input: location.tgl_input,
            user_update: location.user_update,
            tgl_update: location.tgl_update,
            uuid: location.uuid
          }] 
        };
      }
      throw new LocationBadRequestException(uuid);
    } else {
      const locations = await this.locationRepository.find();

      if (args.as_references) {
        return {
          data: locations,
          count: locations.length
        };
      } else {
        const data = [];

        if (locations.length) {
          for (const location of locations) {
            const locationUsed = await this.unitRepository.count({ where: {id_lokasi: location.id}});
            const locationHistoryUsed = await this.unitHistoryRepository.count({ where: {id_lokasi: location.id}});
  
            data.push({
              nama: location.nama,
              nama_gedung: location.nama_gedung,
              keterangan: location.keterangan,
              alamat: location.alamat,
              latitude: location.latitude,
              longitude: location.longitude,
              flag_aktif: location.flag_aktif,
              user_input: location.user_input,
              tgl_input: location.tgl_input,
              user_update: location.user_update,
              tgl_update: location.tgl_update,
              uuid: location.uuid,
              digunakan: locationUsed + locationHistoryUsed
            })
          }
        }

        return {
          data: data,
          count: data.length
        };
      }
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

  async deleteLocation(uuid: string): Promise<any> {
    const findLocation = await this.locationRepository.findOne({where: {uuid: uuid}});

    if (findLocation) {
      const locationUsed = await this.unitRepository.count({ where: {id_lokasi: findLocation.id}});
      const locationHistoryUsed = await this.unitHistoryRepository.count({ where: {id_lokasi: findLocation.id}});

      if ((locationUsed + locationHistoryUsed) < 1) {
        const deleteResponse = await this.locationRepository.delete(findLocation.id);
        if (deleteResponse.affected) {
          return { message: 'Data lokasi berhasil dihapus.' };
        }
        throw new BadRequestException('Data lokasi gagal dihapus.');
      }
      throw new BadRequestException('Data lokasi sudah digunakan, tidak bisa dihapus.');
    }
    throw new LocationBadRequestException(uuid);
  }

  async getLocationByUUID(uuid: string) {
    return this.locationRepository.findOne({ where: { uuid: uuid }});
  }

}
