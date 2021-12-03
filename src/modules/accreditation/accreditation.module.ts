import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccreditationEntity } from './accreditation.entity';
import { AccreditationController } from './accreditation.controller';
import { AccreditationService } from './accreditation.service';

@Module({
    imports: [TypeOrmModule.forFeature([AccreditationEntity])],
    controllers: [AccreditationController],
    providers: [AccreditationService],
})
export class AccreditationModule { }
