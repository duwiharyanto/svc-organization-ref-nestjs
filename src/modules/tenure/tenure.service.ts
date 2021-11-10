import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenureEntity } from './tenure.entity';
import { CreateTenureDto } from './dto/create-tenure.dto';
import { UpdateTenureDto } from './dto/update-tenure.dto';
import { StatusDataDto } from 'src/shared/dto/status-data.dto';
import { TenureBadRequestException } from './exceptions/tenure-bad-request.exception';

@Injectable()
export class TenureService {
  constructor(
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

  async readTenure(uuid?: string): Promise<any> {
    if (uuid) {
      const tenure = await this.tenureRepository.findOne({where: {uuid: uuid}});
      if (tenure) {
        return { 
          data: [tenure] 
        };
      }
      throw new TenureBadRequestException(uuid);
    } else {
      const tenures = await this.tenureRepository.find();
      const tenuresCount = await this.tenureRepository.count();
      return {
        data: tenures,
        count: tenuresCount
      };
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

  async deleteTenure(uuid: string): Promise<void> {
    const findTenure = await this.tenureRepository.findOne({where: {uuid: uuid}});
    const deleteResponse = await this.tenureRepository.softDelete(findTenure.id);
    if (!deleteResponse.affected) {
      throw new TenureBadRequestException(uuid);
    }
  }
  
}
