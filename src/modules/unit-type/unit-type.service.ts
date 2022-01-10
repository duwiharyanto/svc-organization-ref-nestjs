import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusDataDto } from 'src/shared/dto/status-data.dto';
import { UnitEntity } from 'src/shared/entities/unit.entity';
import { UnitHistoryEntity } from 'src/shared/entities/units-history.entity';
import { Repository } from 'typeorm';
import { CreateUnitTypeDto } from './dto/create-unit-type.dto';
import { UpdateUnitTypeDto } from './dto/update-unit-type.dto';
import { UnitTypeBadRequestException } from './exceptions/unit-type-bad-request.exception';
import { UnitTypeEntity } from './unit-type.entity';

@Injectable()
export class UnitTypeService { 
  constructor(
    @InjectRepository(UnitEntity) private unitRepository: Repository<UnitEntity>,
    @InjectRepository(UnitHistoryEntity) private unitHistoryRepository: Repository<UnitHistoryEntity>,
    @InjectRepository(UnitTypeEntity) private unitTypeRepository: Repository<UnitTypeEntity>
  ) { }

  async createUnitType(unitType: CreateUnitTypeDto) {
    const newUnitType = await this.unitTypeRepository.create(unitType);
    await this.unitTypeRepository.save(newUnitType);
    return {
      message: 'Data berhasil ditambah',
      data: [newUnitType]
    };
  }

  async readUnitType(args: any, uuid?: string): Promise<any> {
    if (uuid) {
      const unitType = await this.unitTypeRepository.findOne({ where: {uuid: uuid}});
      if (unitType) {
        return { 
          data: [{
            nama_jenis_unit: unitType.nama_jenis_unit,
            nama_jenis_unit_en: unitType.nama_jenis_unit_en,
            nama_singkat_jenis_unit: unitType.nama_singkat_jenis_unit,
            nama_singkat_jenis_unit_en: unitType.nama_singkat_jenis_unit_en,
            flag_aktif: unitType.flag_aktif,
            user_input: unitType.user_input,
            tgl_input: unitType.tgl_input,
            user_update: unitType.user_update,
            tgl_update: unitType.tgl_update,
            uuid: unitType.uuid
          }] 
        };
      }
      throw new UnitTypeBadRequestException(uuid);
    } else {
      if (args.as_references || args.as_reference) {
        const unitTypes = await this.unitTypeRepository.find({ where: { flag_aktif: 1 }});

        return {
          data: unitTypes,
          count: unitTypes.length
        };
      } else {
        const unitTypes = await this.unitTypeRepository.find();
        const data = [];

        if (unitTypes.length) {
          for (const unitType of unitTypes) {
            const unitTypeUsed = await this.unitRepository.count({ where: {id_jenis_unit: unitType.id}});
            const unitTypeHistoryUsed = await this.unitHistoryRepository.count({ where: {id_jenis_unit: unitType.id}});
  
            data.push({
              nama_jenis_unit: unitType.nama_jenis_unit,
              nama_jenis_unit_en: unitType.nama_jenis_unit_en,
              nama_singkat_jenis_unit: unitType.nama_singkat_jenis_unit,
              nama_singkat_jenis_unit_en: unitType.nama_singkat_jenis_unit_en,
              flag_aktif: unitType.flag_aktif,
              user_input: unitType.user_input,
              tgl_input: unitType.tgl_input,
              user_update: unitType.user_update,
              tgl_update: unitType.tgl_update,
              uuid: unitType.uuid,
              digunakan: unitTypeUsed + unitTypeHistoryUsed
            })
          }
        }
        
        return {
          data: data,
          count: unitTypes.length
        };
      }
    }
  }

  async updateUnitType(uuid: string, unitType: UpdateUnitTypeDto | StatusDataDto): Promise<any> {
    const findUnitType = await this.unitTypeRepository.findOne({ where: {uuid: uuid}});
    await this.unitTypeRepository.update(findUnitType.id, unitType);
    const updatedUnitType = await this.unitTypeRepository.findOne(findUnitType.id);
    if (updatedUnitType) {
      return {
        message: 'Data berhasil diubah',
        data: [updatedUnitType]
      };
    }
    throw new UnitTypeBadRequestException(uuid);
  }

  async deleteUnitType(uuid: string): Promise<any> {
    const findUnitType = await this.unitTypeRepository.findOne({ where: {uuid: uuid}});

    if (findUnitType) {
      const unitTypeUsed = await this.unitRepository.count({ where: {id_jenis_unit: findUnitType.id}});
      const unitTypeHistoryUsed = await this.unitHistoryRepository.count({ where: {id_jenis_unit: findUnitType.id}});

      if ((unitTypeUsed + unitTypeHistoryUsed) < 1) {
        const deleteResponse = await this.unitTypeRepository.delete(findUnitType.id);
        if (deleteResponse.affected) {
          return { message: 'Data jenis unit berhasil dihapus.' };
        }
        throw new BadRequestException('Data jenis unit gagal dihapus.');
      }
      throw new BadRequestException('Data jenis unit sudah digunakan, tidak bisa dihapus.');
    }

    throw new UnitTypeBadRequestException(uuid);
  }

  async getUnitTypeByUUID(uuid: string) {
    return this.unitTypeRepository.findOne({ where: {uuid: uuid}});
  }
}
