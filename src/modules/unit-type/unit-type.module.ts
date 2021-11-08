import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitTypeController } from './unit-type.controller';
import { UnitTypeEntity } from './unit-type.entity';
import { UnitTypeService } from './unit-type.service';

@Module({
    imports: [TypeOrmModule.forFeature([UnitTypeEntity])],
    controllers: [UnitTypeController],
    providers: [UnitTypeService],
})
export class UnitTypeModule {}
