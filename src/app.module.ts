import { OptionsModule } from './modules/options/options.module';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PositionTypeModule } from './modules/position-type/position-type.module';
import { LocationModule } from './modules/location/location.module';
import { UnitTypeModule } from './modules/unit-type/unit-type.module';
import { TenureModule } from './modules/tenure/tenure.module';
import { validationSchema } from './shared/utils/validation';
import { DatabaseModule } from './shared/database/database.module';
import { AccreditationModule } from './modules/accreditation/accreditation.module';

@Module({
  imports: [
    OptionsModule,
    ConfigModule.forRoot({
      validationSchema
    }),
    DatabaseModule,
    LocationModule,
    UnitTypeModule,
    TenureModule,
    PositionTypeModule,
    AccreditationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
