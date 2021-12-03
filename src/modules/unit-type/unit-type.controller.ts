import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Headers, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UnitTypeService } from 'src/modules/unit-type/unit-type.service';
import { CreateResponseDto } from 'src/shared/dto/create-response.dto';
import { ListResponseDto } from 'src/shared/dto/list-response.dto';
import { StatusDataDto } from 'src/shared/dto/status-data.dto';
import FindOneParams from 'src/shared/utils/find-one-params';
import { CreateUnitTypeDto } from './dto/create-unit-type.dto';
import { SingleUnitTypeDto } from './dto/single-unit-type.dto';
import { UpdateUnitTypeDto } from './dto/update-unit-type.dto';


@ApiTags('Jenis Unit')
@Controller('/public/api/v1/unit-type')
export class UnitTypeController {
  constructor(
    private readonly unitTypeSvc: UnitTypeService
  ) {}

  @ApiHeader({ name: 'X-Member' })
  @ApiQuery({ name: 'limit', type: 'integer', required: false, description: 'Limit amount of resources' })
  @ApiQuery({ name: 'offset', type: 'integer', required: false, description: 'Offset amount of resources.' })
  @ApiOkResponse({ description: 'Get many base response', type: ListResponseDto })
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAllUnitType(@Headers() headers: any) {
    const user = headers['x-member'];

    return this.unitTypeSvc.readUnitType();
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ description: 'Retrieved task by ID successfully', type: SingleUnitTypeDto, isArray: true })
  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  getUnitTypeByUUID(@Headers() headers: any, @Param() { id }: FindOneParams) {
    const user = headers['x-member'];

    return this.unitTypeSvc.readUnitType(id);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiOkResponse({ description: 'Get create one base response', type: CreateResponseDto})
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async createUnitType(@Headers() headers: any, @Body() unitType: CreateUnitTypeDto) {
    const user = headers['x-member'];

    if (!unitType.nama_jenis_unit) throw new BadRequestException('Nama jenis unit wajib diisi.');
    if (!unitType.nama_jenis_unit_en) throw new BadRequestException('Nama jenis unit inggris wajib diisi.');
    unitType.user_input = user;

    return this.unitTypeSvc.createUnitType(unitType);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async updateUnitType(@Headers() headers: any, @Param() { id }: FindOneParams, @Body() unitType: UpdateUnitTypeDto) {
    const user = headers['x-member'];

    if (!unitType.nama_jenis_unit) throw new BadRequestException('Nama jenis unit wajib diisi.');
    if (!unitType.nama_jenis_unit_en) throw new BadRequestException('Nama jenis unit inggris wajib diisi.');
    unitType.user_update = user;

    return this.unitTypeSvc.updateUnitType(id, unitType);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @Put(':id/status')
  @UseInterceptors(ClassSerializerInterceptor)
  async activeDeactiveUnitType(@Headers() headers: any, @Param() { id }: FindOneParams, @Body() unitType: StatusDataDto) {
    const user = headers['x-member'];

    if (unitType.flag_aktif === undefined) throw new BadRequestException('Flag aktif tidak boleh kosong.');
    unitType.user_update = user;

    return this.unitTypeSvc.updateUnitType(id, unitType);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async deleteUnitType(@Headers() headers: any, @Param() { id }: FindOneParams) {
    const user = headers['x-member'];

    return this.unitTypeSvc.deleteUnitType(id);
  }
}
