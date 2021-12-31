import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ReferensiEntity } from './options.entity';
import { OptionsBadRequestException } from './exceptions/options-bad-request.exception';
import { PersonnelEntity } from 'src/shared/entities/personnel.entity';

@Injectable()
export class OptionsService { 
  constructor(
    @InjectRepository(PersonnelEntity) private personnelRepository: Repository<PersonnelEntity>,
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

  async searchPersonnel(query: any): Promise<any> {
    let results = [];
    console.log(isNaN(+query.cari));
    if (isNaN(+query.cari)) {
      results = await this.personnelRepository.find({ nama: Like('%'+query.cari+'%') });
    } else {
      results = await this.personnelRepository.find({ nik: Like('%'+query.cari+'%') });
    }

    return {
      data: results
    }
  }
}
