import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusDataDto } from 'src/shared/dto/status-data.dto';
import { Repository } from 'typeorm';
import { CreatePositionTypeDto } from './dto/create-position-type.dto';
import { UpdatePositionTypeDto } from './dto/update-position-type.dto';
import PositionTypeNotFoundException from './exceptions/position-type-not-found.exception';
import { PositionTypeEntity } from './position-type.entity';

@Injectable()
export class PositionTypeService {

  constructor(
    @InjectRepository(PositionTypeEntity) private positionTypeRepository: Repository<PositionTypeEntity>
  ) {}

  async createPositionType(positionType: CreatePositionTypeDto) {
    const newPositionType = await this.positionTypeRepository.create(positionType);
    await this.positionTypeRepository.save(newPositionType);
    return {
      message: 'Data berhasil ditambah',
      data: [newPositionType]
    };
  }

  async readPositionType(id?: string): Promise<any> {
    if (id) {
      const positionType = await this.positionTypeRepository.findOne(id);
      if (positionType) {
        return { 
          data: [positionType] 
        };
      }
      throw new PositionTypeNotFoundException(id);
    } else {
      const positionTypes = await this.positionTypeRepository.find();
      const positionTypesCount = await this.positionTypeRepository.count();
      return {
        data: positionTypes,
        count: positionTypesCount
      };
    }
  }

  async updatePositionType(id: string, positionType: UpdatePositionTypeDto | StatusDataDto): Promise<any> {
    await this.positionTypeRepository.update(id, positionType);
    const updatedPositionType = await this.positionTypeRepository.findOne(id);
    if (updatedPositionType) {
      return {
        message: 'Data berhasil diubah',
        data: [updatedPositionType]
      };
    }
    throw new PositionTypeNotFoundException(id);
  }

  async deletePositionType(id: string): Promise<void> {
    const deleteResponse = await this.positionTypeRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new PositionTypeNotFoundException(id);
    }
  }

}
