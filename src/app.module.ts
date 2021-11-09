import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnectionService } from './shared/services/database-connection.service';
import { PositionTypeModule } from './modules/position-type/position-type.module';
import { LocationModule } from './modules/location/location.module';
import { UnitTypeModule } from './modules/unit-type/unit-type.module';
import { TenureModule } from './modules/tenure/tenure.module';
import { ConfigurationService } from './shared/services/configuration.service';

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
  providers: [
    ConfigurationService, 
    AppService
  ],
})
export class AppModule { 
  static port: number;

  constructor(
    private readonly configurationSvc: ConfigurationService
  ) {
    AppModule.port = this.configurationSvc.port as number;
  }
}
