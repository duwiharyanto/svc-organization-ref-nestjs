import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateResponseDto } from 'src/shared/dto/create-response.dto';
import { ListResponseDto } from 'src/shared/dto/list-response.dto';
import { StatusDataDto } from 'src/shared/dto/status-data.dto';
import FindOneParams from 'src/shared/utils/find-one-params';
import { CreateTenureDto } from './dto/create-tenure.dto';
import { SingleTenureDto } from './dto/single-tenure.dto';
import { UpdateTenureDto } from './dto/update-tenure.dto';
import { TenureService } from './tenure.service';

@ApiTags('Periode Jabatan')
@Controller('tenure')
export class TenureController { 
  constructor(
    private readonly tenureSvc: TenureService
  ) {}

  @ApiQuery({ name: 'limit', type: 'integer', required: false, description: 'Limit amount of resources' })
  @ApiQuery({ name: 'offset', type: 'integer', required: false, description: 'Offset amount of resources.' })
  @ApiOkResponse({ description: 'Get many base response', type: ListResponseDto })
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAllTenure() {
    return this.tenureSvc.readTenure();
  }

  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ description: 'Retrieved task by ID successfully', type: SingleTenureDto, isArray: true })
  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  getTenureByUUID(@Param() { id }: FindOneParams) {
    return this.tenureSvc.readTenure(id);
  }

  @ApiOkResponse({ description: 'Get create one base response', type: CreateResponseDto})
  @Post()
  // @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async createTenure(@Body() tenure: CreateTenureDto) {
    if (tenure.periode_mulai && tenure.periode_selesai) {
      tenure.nama_periode_jabatan = tenure.periode_mulai + '/' + tenure.periode_selesai;
    }
    return this.tenureSvc.createTenure(tenure);
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async updateTenure(@Param() { id }: FindOneParams, @Body() tenure: UpdateTenureDto) {
    return this.tenureSvc.updateTenure(id, tenure);
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Patch(':id/status')
  @UseInterceptors(ClassSerializerInterceptor)
  async activeDeactiveTenure(@Param() { id }: FindOneParams, @Body() tenure: StatusDataDto) {
    return this.tenureSvc.updateTenure(id, tenure);
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async deleteTenure(@Param() { id }: FindOneParams) {
    return this.tenureSvc.deleteTenure(id);
  }
}
