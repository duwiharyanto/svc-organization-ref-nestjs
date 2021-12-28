import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationController } from './location.controller';
import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationEntity } from './location.entity';
import { UnitEntity } from 'src/shared/entities/unit.entity';
import { UnitHistoryEntity } from 'src/shared/entities/units-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LocationEntity,
      UnitEntity,
      UnitHistoryEntity
    ])
  ],
  controllers: [LocationController,],
  providers: [LocationService],
})
export class LocationModule { }
