import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionTypeEntity } from './position-type.entity';
import { PositionTypeController } from './position-type.controller';
import { PositionTypeService } from './position-type.service';

@Module({
    imports: [TypeOrmModule.forFeature([PositionTypeEntity])],
    controllers: [PositionTypeController],
    providers: [PositionTypeService],
})
export class PositionTypeModule {}
