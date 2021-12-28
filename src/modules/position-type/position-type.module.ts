import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionTypeEntity } from './position-type.entity';
import { PositionTypeController } from './position-type.controller';
import { PositionTypeService } from './position-type.service';
import { OfficerEntity } from 'src/shared/entities/officers.entity';
import { OfficersHistoryEntity } from 'src/shared/entities/officers-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PositionTypeEntity,
      OfficerEntity,
      OfficersHistoryEntity
    ])
  ],
  controllers: [PositionTypeController],
  providers: [PositionTypeService],
})
export class PositionTypeModule {}
