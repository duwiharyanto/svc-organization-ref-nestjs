import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenureController } from './tenure.controller';
import { TenureService } from './tenure.service';
import { TenureEntity } from './tenure.entity';
import { OfficerEntity } from 'src/shared/entities/officers.entity';
import { OfficersHistoryEntity } from 'src/shared/entities/officers-history.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TenureEntity,
            OfficerEntity,
            OfficersHistoryEntity
        ])
    ],
    controllers: [TenureController],
    providers: [TenureService],
})
export class TenureModule { }
