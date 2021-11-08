import { LocationModule } from './modules/location/location.module';
import { UnitTypeModule } from './modules/unit-type/unit-type.module';
import { TenureModule } from './modules/tenure/tenure.module';
import { TenureController } from './modules/tenure/tenure.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnectionService } from './shared/services/database-connection.service';
import { UnitTypeService } from './modules/unit-type/unit-type.service';
import { UnitTypeController } from './modules/unit-type/unit-type.controller';
import { UnitTypeEntity } from './modules/unit-type/unit-type.entity';
import { PositionTypeModule } from './modules/position-type/position-type.module';

@Module({
  imports: [
    LocationModule,
    UnitTypeModule,
    TenureModule,
    PositionTypeModule,
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
