import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusDataDto } from 'src/shared/dto/status-data.dto';
import { Repository } from 'typeorm';
import { CreateUnitTypeDto } from './dto/create-unit-type.dto';
import { UpdateUnitTypeDto } from './dto/update-unit-type.dto';
import UnitTypeNotFoundException from './exceptions/unit-type-not-found.exception';
import { UnitTypeEntity } from './unit-type.entity';

@Injectable()
export class UnitTypeService { 
  constructor(
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

  async readUnitType(uuid?: string): Promise<any> {
    if (uuid) {
      const unitType = await this.unitTypeRepository.findOne({ where: {uuid: uuid}});
      if (unitType) {
        return { 
          data: [unitType] 
        };
      }
      throw new UnitTypeNotFoundException(uuid);
    } else {
      const unitTypes = await this.unitTypeRepository.find();
      const unitTypesCount = await this.unitTypeRepository.count();
      return {
        data: unitTypes,
        count: unitTypesCount
      };
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
    throw new UnitTypeNotFoundException(uuid);
  }

  async deleteUnitType(uuid: string): Promise<void> {
    const findUnitType = await this.unitTypeRepository.findOne({ where: {uuid: uuid}});
    const deleteResponse = await this.unitTypeRepository.softDelete(findUnitType.id);
    if (!deleteResponse.affected) {
      throw new UnitTypeNotFoundException(uuid);
    }
  }
}
