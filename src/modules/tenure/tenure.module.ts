import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenureController } from './tenure.controller';
import { TenureService } from './tenure.service';
import { TenureEntity } from './tenure.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TenureEntity])],
    controllers: [TenureController],
    providers: [TenureService],
})
export class TenureModule { }
