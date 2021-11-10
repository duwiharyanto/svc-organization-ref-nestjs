import { DatabaseModule } from './shared/database/database.module';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PositionTypeModule } from './modules/position-type/position-type.module';
import { LocationModule } from './modules/location/location.module';
import { UnitTypeModule } from './modules/unit-type/unit-type.module';
import { TenureModule } from './modules/tenure/tenure.module';
import { validationSchema } from './shared/utils/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema
    }),
    DatabaseModule,
    LocationModule,
    UnitTypeModule,
    TenureModule,
    PositionTypeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
