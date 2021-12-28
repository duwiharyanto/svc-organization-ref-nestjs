import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Headers, Param, Patch, Post, Put, UseInterceptors, BadRequestException } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateResponseDto } from 'src/shared/dto/create-response.dto';
import { ListResponseDto } from 'src/shared/dto/list-response.dto';
import { StatusDataDto } from 'src/shared/dto/status-data.dto';
import FindOneParams from 'src/shared/utils/find-one-params';
import { CreateTenureDto } from './dto/create-tenure.dto';
import { SingleTenureDto } from './dto/single-tenure.dto';
import { UpdateTenureDto } from './dto/update-tenure.dto';
import { TenureService } from './tenure.service';

@ApiTags('Periode Jabatan')
@Controller('/public/api/v1/tenure')
export class TenureController { 
  constructor(
    private readonly tenureSvc: TenureService
  ) {}

  @ApiHeader({ name: 'X-Member' })
  @ApiQuery({ name: 'limit', type: 'integer', required: false, description: 'Limit amount of resources' })
  @ApiQuery({ name: 'offset', type: 'integer', required: false, description: 'Offset amount of resources.' })
  @ApiOkResponse({ description: 'Get many base response', type: ListResponseDto })
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAllTenure(@Headers() headers: any) {
    const user = headers['x-member'];

    return this.tenureSvc.readTenure();
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ description: 'Retrieved task by ID successfully', type: SingleTenureDto, isArray: true })
  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  getTenureByUUID(@Headers() headers: any, @Param() { id }: FindOneParams) {
    const user = headers['x-member'];

    return this.tenureSvc.readTenure(id);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiOkResponse({ description: 'Get create one base response', type: CreateResponseDto})
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async createTenure(@Headers() headers: any, @Body() tenure: CreateTenureDto) {
    const user = headers['x-member'];

    if (tenure.periode_mulai === undefined || tenure.periode_mulai === 0) throw new BadRequestException('Periode mulai wajib diisi.');
    if (tenure.periode_selesai === undefined || tenure.periode_selesai == 0) throw new BadRequestException('Periode selesai wajib diisi.');
    if (tenure.periode_mulai === tenure.periode_selesai) throw new BadRequestException('Periode mulai dan periode selesai tidak boleh sama.');
    if (!tenure.tanggal_periode_mulai) throw new BadRequestException('Tanggal periode mulai wajib diisi.');
    if (!tenure.tanggal_periode_selesai) throw new BadRequestException('Tanggal periode selesai wajib diisi.');
    tenure.nama_periode_jabatan = tenure.periode_mulai + '/' + tenure.periode_selesai;
    tenure.user_input = user;
    delete tenure.periode_mulai;
    delete tenure.periode_selesai;

    return this.tenureSvc.createTenure(tenure);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async updateTenure(@Headers() headers: any, @Param() { id }: FindOneParams, @Body() tenure: UpdateTenureDto) {
    const user = headers['x-member'];

    if (tenure.periode_mulai === undefined || tenure.periode_mulai === 0) throw new BadRequestException('Periode mulai wajib diisi.');
    if (tenure.periode_selesai === undefined || tenure.periode_selesai === 0) throw new BadRequestException('Periode selesai wajib diisi.');
    if (tenure.periode_mulai === tenure.periode_selesai) throw new BadRequestException('Periode mulai dan periode selesai tidak boleh sama.');
    if (!tenure.tanggal_periode_mulai) throw new BadRequestException('Tanggal periode mulai wajib diisi.');
    if (!tenure.tanggal_periode_selesai) throw new BadRequestException('Tanggal periode selesai wajib diisi.');
    tenure.nama_periode_jabatan = tenure.periode_mulai + '/' + tenure.periode_selesai;
    tenure.user_update = user;
    delete tenure.periode_mulai;
    delete tenure.periode_selesai;

    return this.tenureSvc.updateTenure(id, tenure);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @Put(':id/active')
  @UseInterceptors(ClassSerializerInterceptor)
  async activeDeactiveTenure(@Headers() headers: any, @Param() { id }: FindOneParams, @Body() tenure: StatusDataDto) {
    const user = headers['x-member'];
    const findTenure = await this.tenureSvc.getTenuerByUUID(id);

    // if (tenure.flag_aktif === undefined) throw new BadRequestException('Flag aktif tidak boleh kosong.');
    tenure.flag_aktif = findTenure.flag_aktif === 1 ? 0 : 1;
    tenure.user_update = user;

    return this.tenureSvc.updateTenure(id, tenure);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async deleteTenure(@Headers() headers: any, @Param() { id }: FindOneParams) {
    const user = headers['x-member'];

    return this.tenureSvc.deleteTenure(id);
  }
}
