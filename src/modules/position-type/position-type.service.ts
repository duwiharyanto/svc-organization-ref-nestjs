import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusDataDto } from 'src/shared/dto/status-data.dto';
import { Repository } from 'typeorm';
import { CreatePositionTypeDto } from './dto/create-position-type.dto';
import { UpdatePositionTypeDto } from './dto/update-position-type.dto';
import { PositionTypeBadRequestException } from './exceptions/position-type-bad-request.exception';
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

  async readPositionType(uuid?: string): Promise<any> {
    if (uuid) {
      const positionType = await this.positionTypeRepository.findOne({where: {uuid: uuid}});
      if (positionType) {
        return { 
          data: [positionType] 
        };
      }
      throw new PositionTypeBadRequestException(uuid);
    } else {
      const positionTypes = await this.positionTypeRepository.find();
      const data = [];
      if (positionTypes.length) {
        for (const positionType of positionTypes) {
          const positionTypeUsed = 0;

          data.push({
            nama_jenis_jabatan: positionType.nama_jenis_jabatan,
            nama_jenis_jabatan_en: positionType.nama_jenis_jabatan_en,
            nama_singkat_jenis_jabatan: positionType.nama_singkat_jenis_jabatan,
            nama_singkat_jenis_jabatan_en: positionType.nama_singkat_jenis_jabatan_en,
            flag_aktif: positionType.flag_aktif,
            user_input: positionType.user_input,
            tgl_input: positionType.tgl_input,
            user_update: positionType.user_update,
            tgl_update: positionType.tgl_update,
            uuid: positionType.uuid,
            digunakan: positionTypeUsed
          });
        }
      }
      // const positionTypesCount = await this.positionTypeRepository.count();
      return {
        data: data,
        count: positionTypes.length
      };
    }
  }

  async updatePositionType(uuid: string, positionType: UpdatePositionTypeDto | StatusDataDto): Promise<any> {
    const findPositionType = await this.positionTypeRepository.findOne({where: {uuid: uuid}});
    await this.positionTypeRepository.update(findPositionType.id, positionType);
    const updatedPositionType = await this.positionTypeRepository.findOne(findPositionType.id);
    if (updatedPositionType) {
      return {
        message: 'Data berhasil diubah',
        data: [updatedPositionType]
      };
    }
    throw new PositionTypeBadRequestException(uuid);
  }

  async deletePositionType(uuid: string): Promise<void> {
    const findPositionType = await this.positionTypeRepository.findOne({where: {uuid: uuid}});
    const deleteResponse = await this.positionTypeRepository.softDelete(findPositionType.id);
    if (!deleteResponse.affected) {
      throw new PositionTypeBadRequestException(uuid);
    }
  }

}
