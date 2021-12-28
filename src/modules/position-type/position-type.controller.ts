import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Headers, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import FindOneParams from 'src/shared/utils/find-one-params';
import { CreatePositionTypeDto } from './dto/create-position-type.dto';
import { PositionTypeService } from './position-type.service';
import { ListResponseDto } from 'src/shared/dto/list-response.dto';
import { SinglePositionTypeDto } from './dto/single-position-type.dto';
import { CreateResponseDto } from 'src/shared/dto/create-response.dto';
import { UpdatePositionTypeDto } from './dto/update-position-type.dto';
import { StatusDataDto } from 'src/shared/dto/status-data.dto';

@ApiTags('Jenis Jabatan')
@Controller('/public/api/v1/position-type')
export class PositionTypeController { 
  constructor(
    private readonly positionTypeSvc: PositionTypeService
  ) {}
  
  @ApiHeader({ name: 'X-Member' })
  @ApiQuery({ name: 'limit', type: 'integer', required: false, description: 'Limit amount of resources' })
  @ApiQuery({ name: 'offset', type: 'integer', required: false, description: 'Offset amount of resources.' })
  @ApiOkResponse({ description: 'Get many base response', type: ListResponseDto })
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAllPositionType(@Headers() headers: any) {
    const user = headers['x-member'];

    return this.positionTypeSvc.readPositionType();
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ description: 'Retrieved task by ID successfully', type: SinglePositionTypeDto, isArray: true })
  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  getPositionTypeByUUID(@Headers() headers: any, @Param() { id }: FindOneParams) {
    const user = headers['x-member'];

    return this.positionTypeSvc.readPositionType(id);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiOkResponse({ description: 'Get create one base response', type: CreateResponseDto})
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async createPositionType(@Headers() headers: any, @Body() positionType: CreatePositionTypeDto) {
    const user = headers['x-member'];

    if (!positionType.nama_jenis_jabatan) throw new BadRequestException('Nama jenis jabatan wajib diisi.');
    if (!positionType.nama_jenis_jabatan_en) throw new BadRequestException('Nama jenis jabatan inggris wajib diisi.');
    positionType.user_input = user;
    
    return this.positionTypeSvc.createPositionType(positionType);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async updatePositionType(@Headers() headers: any, @Param() { id }: FindOneParams, @Body() positionType: UpdatePositionTypeDto) {
    const user = headers['x-member'];

    if (!positionType.nama_jenis_jabatan) throw new BadRequestException('Nama jenis jabatan wajib diisi.');
    if (!positionType.nama_jenis_jabatan_en) throw new BadRequestException('Nama jenis jabatan inggris wajib diisi.');
    positionType.user_update = user;

    return this.positionTypeSvc.updatePositionType(id, positionType);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @Put(':id/active')
  @UseInterceptors(ClassSerializerInterceptor)
  async activeDeactivePositionType(@Headers() headers: any, @Param() { id }: FindOneParams, @Body() positionType: StatusDataDto) {
    const user = headers['x-member'];
    const findPositionType = await this.positionTypeSvc.getPositionTypeByUUID(id);

    // if (positionType.flag_aktif === undefined) throw new BadRequestException('Flag aktif tidak boleh kosong.');
    positionType.flag_aktif = findPositionType.flag_aktif === 1 ? 0 : 1;
    positionType.user_update = user;

    return this.positionTypeSvc.updatePositionType(id, positionType);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async deletePositionType(@Headers() headers: any, @Param() { id }: FindOneParams) {
    const user = headers['x-member'];

    return this.positionTypeSvc.deletePositionType(id);
  }
}
