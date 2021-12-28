import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitEntity } from 'src/shared/entities/unit.entity';
import { UnitHistoryEntity } from 'src/shared/entities/units-history.entity';
import { UnitTypeController } from './unit-type.controller';
import { UnitTypeEntity } from './unit-type.entity';
import { UnitTypeService } from './unit-type.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UnitEntity,
      UnitHistoryEntity,
      UnitTypeEntity
    ])
  ],
  controllers: [UnitTypeController],
  providers: [UnitTypeService],
})
export class UnitTypeModule {}
