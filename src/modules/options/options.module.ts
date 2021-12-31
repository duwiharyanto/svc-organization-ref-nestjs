import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferensiEntity } from './options.entity';
import { PersonnelEntity } from 'src/shared/entities/personnel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PersonnelEntity,
      ReferensiEntity
    ])
  ],
  controllers: [OptionsController],
  providers: [OptionsService],
})
export class OptionsModule { }
