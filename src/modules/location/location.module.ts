import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationController } from './location.controller';
import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationEntity } from './location.entity';

@Module({
    imports: [TypeOrmModule.forFeature([LocationEntity])],
    controllers: [LocationController,],
    providers: [LocationService],
})
export class LocationModule { }
