import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UnitTypeService } from 'src/modules/unit-type/unit-type.service';
import { CreateResponseDto } from 'src/shared/dto/create-response.dto';
import { ListResponseDto } from 'src/shared/dto/list-response.dto';
import { StatusDataDto } from 'src/shared/dto/status-data.dto';
import FindOneParams from 'src/shared/utils/find-one-params';
import { CreateUnitTypeDto } from './dto/create-unit-type.dto';
import { SingleUnitTypeDto } from './dto/single-unit-type.dto';
import { UpdateUnitTypeDto } from './dto/update-unit-type.dto';


@ApiTags('Jenis Unit')
@Controller('unit-type')
export class UnitTypeController {
  constructor(
    private readonly unitTypeSvc: UnitTypeService
  ) {}

  @ApiQuery({ name: 'limit', type: 'integer', required: false, description: 'Limit amount of resources' })
  @ApiQuery({ name: 'offset', type: 'integer', required: false, description: 'Offset amount of resources.' })
  @ApiOkResponse({ description: 'Get many base response', type: ListResponseDto })
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAllUnitType() {
    return this.unitTypeSvc.readUnitType();
  }

  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ description: 'Retrieved task by ID successfully', type: SingleUnitTypeDto, isArray: true })
  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  getUnitTypeByUUID(@Param() { id }: FindOneParams) {
    return this.unitTypeSvc.readUnitType(id);
  }

  @ApiOkResponse({ description: 'Get create one base response', type: CreateResponseDto})
  @Post()
  // @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async createUnitType(@Body() unitType: CreateUnitTypeDto) {
    return this.unitTypeSvc.createUnitType(unitType);
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async updateUnitType(@Param() { id }: FindOneParams, @Body() unitType: UpdateUnitTypeDto) {
    return this.unitTypeSvc.updateUnitType(id, unitType);
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Patch(':id/status')
  @UseInterceptors(ClassSerializerInterceptor)
  async activeDeactiveUnitType(@Param() { id }: FindOneParams, @Body() unitType: StatusDataDto) {
    return this.unitTypeSvc.updateUnitType(id, unitType);
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async deleteUnitType(@Param() { id }: FindOneParams) {
    return this.unitTypeSvc.deleteUnitType(id);
  }
}
