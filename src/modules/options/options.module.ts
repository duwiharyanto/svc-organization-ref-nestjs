import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferensiEntity } from './options.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReferensiEntity])],
  controllers: [OptionsController],
  providers: [OptionsService],
})
export class OptionsModule { }
