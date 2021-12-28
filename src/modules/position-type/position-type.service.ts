import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusDataDto } from 'src/shared/dto/status-data.dto';
import { OfficersHistoryEntity } from 'src/shared/entities/officers-history.entity';
import { OfficerEntity } from 'src/shared/entities/officers.entity';
import { Repository } from 'typeorm';
import { CreatePositionTypeDto } from './dto/create-position-type.dto';
import { UpdatePositionTypeDto } from './dto/update-position-type.dto';
import { PositionTypeBadRequestException } from './exceptions/position-type-bad-request.exception';
import { PositionTypeEntity } from './position-type.entity';

@Injectable()
export class PositionTypeService {

  constructor(
    @InjectRepository(OfficerEntity) private officerRepository: Repository<OfficerEntity>,
    @InjectRepository(OfficersHistoryEntity) private officerHistoryRepository: Repository<OfficersHistoryEntity>,
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

  async readPositionType(args: any, uuid?: string): Promise<any> {
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

      if (args.as_references) {
        return {
          data: positionTypes,
          count: positionTypes.length
        }
      } else {
        const data = [];
        if (positionTypes.length) {
          for (const positionType of positionTypes) {
            const positionTypeUsed = await this.officerRepository.count({ where: {id_jenis_jabatan: positionType.id}});
            const positionTypeHistoryUsed = await this.officerHistoryRepository.count({ where: {id_jenis_jabatan: positionType.id}});
  
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
              digunakan: positionTypeUsed + positionTypeHistoryUsed
            });
          }
        }
  
        return {
          data: data,
          count: positionTypes.length
        };
      }
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

  async deletePositionType(uuid: string): Promise<any> {
    const findPositionType = await this.positionTypeRepository.findOne({where: {uuid: uuid}});

    if (findPositionType) {
      const positionTypeUsed = await this.officerRepository.count({ where: {id_jenis_jabatan: findPositionType.id}});
      const positionTypeHistoryUsed = await this.officerHistoryRepository.count({ where: {id_jenis_jabatan: findPositionType.id}});

      if ((positionTypeUsed + positionTypeHistoryUsed) < 1) {
        const deleteResponse = await this.positionTypeRepository.delete(findPositionType.id);
        if (deleteResponse.affected) {
          return { message: 'Data jenis jabatan berhasil dihapus.' };
        }
        throw new BadRequestException('Data jenis jabatan gagal dihapus.');
      }
      throw new BadRequestException('Data jenis jabatan sudah digunakan, tidak bisa dihapus.');
    }

    throw new PositionTypeBadRequestException(uuid);
  }

  async getPositionTypeByUUID(uuid: string) {
    return this.positionTypeRepository.findOne({ where: { uuid: uuid }});
  }

}
