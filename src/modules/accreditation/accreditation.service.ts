import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccreditationEntity } from './accreditation.entity';
import { AccreditationBadRequestException } from './exceptions/accreditation-bad-request.exception';

@Injectable()
export class AccreditationService { 

  constructor(
    @InjectRepository(AccreditationEntity) private accreditationRepository: Repository<AccreditationEntity>
  ) {}

  async readAccreditation(uuid?: string): Promise<any> {
    if (uuid) {
      const accreditation = await this.accreditationRepository.findOne({where: {uuid: uuid}});
      if (accreditation) {
        return { 
          data: [accreditation] 
        };
      }
      throw new AccreditationBadRequestException(uuid);
    } else {
      const accreditations = await this.accreditationRepository.find({
        where: { flag_aktif: 1 },
        order: { no_urut: 'ASC' }
      });
      const accreditationsCount = await this.accreditationRepository.count();
      return {
        data: accreditations,
        count: accreditationsCount
      };
    }
  }
}
