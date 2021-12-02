import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReferensiEntity } from './options.entity';
import { OptionsBadRequestException } from './exceptions/options-bad-request.exception';

@Injectable()
export class OptionsService { 
  constructor(
    @InjectRepository(ReferensiEntity) private referenceRepository: Repository<ReferensiEntity>
  ) {}

  async readReference(query: any, uuid?: string): Promise<any> {
    if (uuid) {
      const accreditation = await this.referenceRepository.findOne({where: {uuid: uuid}});
      if (accreditation) {
        return { 
          data: [accreditation] 
        };
      }
      throw new OptionsBadRequestException(uuid);
    } else {
      const accreditations = await this.referenceRepository.find({
        where: { 
          flag_aktif: 1,
          kelompok: query.kelompok
        },
        order: { no_urut: 'ASC' }
      });
      const accreditationsCount = await this.referenceRepository.count({
        where: { 
          flag_aktif: 1,
          kelompok: query.kelompok
        },
        order: { no_urut: 'ASC' }
      });
      return {
        data: accreditations,
        count: accreditationsCount
      };
    }
  }
}
