import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenureEntity } from './tenure.entity';
import { CreateTenureDto } from './dto/create-tenure.dto';
import { UpdateTenureDto } from './dto/update-tenure.dto';
import { StatusDataDto } from 'src/shared/dto/status-data.dto';
import TenureNotFoundException from './exceptions/tenure-not-found.exception';

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

  async readTenure(id?: string): Promise<any> {
    if (id) {
      const tenure = await this.tenureRepository.findOne(id);
      if (tenure) {
        return { 
          data: [tenure] 
        };
      }
      throw new TenureNotFoundException(id);
    } else {
      const tenures = await this.tenureRepository.find();
      const tenuresCount = await this.tenureRepository.count();
      return {
        data: tenures,
        count: tenuresCount
      };
    }
  }

  async updateTenure(id: string, tenure: UpdateTenureDto | StatusDataDto): Promise<any> {
    await this.tenureRepository.update(id, tenure);
    const updatedTenure = await this.tenureRepository.findOne(id);
    if (updatedTenure) {
      return {
        message: 'Data berhasil diubah',
        data: [updatedTenure]
      };
    }
    throw new TenureNotFoundException(id);
  }

  async deleteTenure(id: string): Promise<void> {
    const deleteResponse = await this.tenureRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new TenureNotFoundException(id);
    }
  }
  
}
