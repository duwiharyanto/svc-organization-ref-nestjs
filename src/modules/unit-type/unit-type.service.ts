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

  async readUnitType(id?: string): Promise<any> {
    if (id) {
      const unitType = await this.unitTypeRepository.findOne(id);
      if (unitType) {
        return { 
          data: [unitType] 
        };
      }
      throw new UnitTypeNotFoundException(id);
    } else {
      const unitTypes = await this.unitTypeRepository.find();
      const unitTypesCount = await this.unitTypeRepository.count();
      return {
        data: unitTypes,
        count: unitTypesCount
      };
    }
  }

  async updateUnitType(id: string, unitType: UpdateUnitTypeDto | StatusDataDto): Promise<any> {
    await this.unitTypeRepository.update(id, unitType);
    const updatedUnitType = await this.unitTypeRepository.findOne(id);
    if (updatedUnitType) {
      return {
        message: 'Data berhasil diubah',
        data: [updatedUnitType]
      };
    }
    throw new UnitTypeNotFoundException(id);
  }

  async deleteUnitType(id: string): Promise<void> {
    const deleteResponse = await this.unitTypeRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new UnitTypeNotFoundException(id);
    }
  }
}
