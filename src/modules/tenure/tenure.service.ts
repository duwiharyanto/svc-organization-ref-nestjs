import { dateToStrLocal } from './../../shared/utils/helper-functions';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenureEntity } from './tenure.entity';
import { CreateTenureDto } from './dto/create-tenure.dto';
import { UpdateTenureDto } from './dto/update-tenure.dto';
import { StatusDataDto } from 'src/shared/dto/status-data.dto';
import { TenureBadRequestException } from './exceptions/tenure-bad-request.exception';
import { OfficerEntity } from 'src/shared/entities/officers.entity';
import { OfficersHistoryEntity } from 'src/shared/entities/officers-history.entity';

@Injectable()
export class TenureService {
  constructor(
    @InjectRepository(OfficerEntity) private officerRepository: Repository<OfficerEntity>,
    @InjectRepository(OfficersHistoryEntity) private officerHistoryRepository: Repository<OfficersHistoryEntity>,
    @InjectRepository(TenureEntity) private tenureRepository: Repository<TenureEntity>
  ) {}

  async createTenure(tenure: CreateTenureDto) {
    const newTenure = await this.tenureRepository.create(tenure);
    await this.tenureRepository.save(newTenure);
    return {
      message: 'Data berhasil ditambah',
      data: [newTenure]
    };
  }

  async readTenure(args: any, uuid?: string): Promise<any> {
    if (uuid) {
      const tenure = await this.tenureRepository.findOne({where: {uuid: uuid}});
      if (tenure) {
        const periodeArray = tenure.nama_periode_jabatan.split('/');
        return { 
          data: [{
            nama_periode_jabatan: tenure.nama_periode_jabatan,
            periode_mulai: periodeArray[0],
            periode_selesai: periodeArray[1],
            tanggal_periode_mulai: tenure.tanggal_periode_mulai,
            tanggal_periode_selesai: tenure.tanggal_periode_selesai,
            tanggal_periode_mulai_in_ID: dateToStrLocal(tenure.tanggal_periode_mulai),
            tanggal_periode_selesai_in_ID: dateToStrLocal(tenure.tanggal_periode_selesai),
            flag_aktif: tenure.flag_aktif,
            user_input: tenure.user_input,
            tgl_input: tenure.tgl_input,
            user_update: tenure.user_update,
            tgl_update: tenure.tgl_update,
            uuid: tenure.uuid
          }] 
        };
      }
      throw new TenureBadRequestException(uuid);
    } else {
      if (args.as_references || args.as_reference) {
        const tenures = await this.tenureRepository.find({ where: { flag_aktif: 1 }});
  
        return {
          data: tenures,
          count: tenures.length
        };
      } else {
        const tenures = await this.tenureRepository.find();  
        const data = [];
  
        if (tenures.length) {
          for (const tenure of tenures) {
            const tenureUsed = await this.officerRepository.count({ where: {id_periode_jabatan: tenure.id}});
            const tenureHistoryUsed = await this.officerHistoryRepository.count({ where: {id_periode_jabatan: tenure.id}});
  
            data.push({
              nama_periode_jabatan: tenure.nama_periode_jabatan,
              tanggal_periode_mulai: tenure.tanggal_periode_mulai,
              tanggal_periode_selesai: tenure.tanggal_periode_selesai,
              tanggal_periode_mulai_in_ID: dateToStrLocal(tenure.tanggal_periode_mulai),
              tanggal_periode_selesai_in_ID: dateToStrLocal(tenure.tanggal_periode_selesai),
              flag_aktif: tenure.flag_aktif,
              user_input: tenure.user_input,
              tgl_input: tenure.tgl_input,
              user_update: tenure.user_update,
              tgl_update: tenure.tgl_update,
              uuid: tenure.uuid,
              digunakan: tenureUsed + tenureHistoryUsed
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

  async updateTenure(uuid: string, tenure: UpdateTenureDto | StatusDataDto): Promise<any> {
    const findTenure = await this.tenureRepository.findOne({where: {uuid: uuid}});
    await this.tenureRepository.update(findTenure.id, tenure);
    const updatedTenure = await this.tenureRepository.findOne(findTenure.id);
    if (updatedTenure) {
      return {
        message: 'Data berhasil diubah',
        data: [updatedTenure]
      };
    }
    throw new TenureBadRequestException(uuid);
  }

  async deleteTenure(uuid: string): Promise<any> {
    const findTenure = await this.tenureRepository.findOne({where: {uuid: uuid}});

    if (findTenure) {
      const tenureUsed = await this.officerRepository.count({ where: {id_periode_jabatan: findTenure.id}});
      const tenureHistoryUsed = await this.officerHistoryRepository.count({ where: {id_periode_jabatan: findTenure.id}});

      if ((tenureUsed + tenureHistoryUsed) < 1) {
        const deleteResponse = await this.tenureRepository.delete(findTenure.id);
      
        if (deleteResponse.affected) {
          return { message: 'Data periode jabatan berhasil dihapus.' };
        }
        throw new BadRequestException('Data periode jabatan gagal dihapus.');
      }

      throw new BadRequestException('Data periode jabatan sudah digunakan, tidak bisa dihapus.');
    }
    throw new TenureBadRequestException(uuid);
  }

  async getTenuerByUUID(uuid: string) {
    return this.tenureRepository.findOne({where: {uuid: uuid}});
  }
  
}
