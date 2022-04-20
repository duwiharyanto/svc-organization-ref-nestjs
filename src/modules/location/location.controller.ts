import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Headers, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateResponseDto } from 'src/shared/dto/create-response.dto';
import { ListResponseDto } from 'src/shared/dto/list-response.dto';
import { StatusDataDto } from 'src/shared/dto/status-data.dto';
import FindOneParams from 'src/shared/utils/find-one-params';
import { CreateLocationDto } from './dto/create-location.dto';
import { SingleLocationDto } from './dto/single-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationService } from './location.service';

@ApiTags('Lokasi')
@Controller('/public/api/v1/location')
export class LocationController { 
  constructor(
    private readonly locationSvc: LocationService
  ) {}
  
  @ApiHeader({ name: 'X-Member' })
  @ApiQuery({ name: 'limit', type: 'integer', required: false, description: 'Limit amount of resources' })
  @ApiQuery({ name: 'offset', type: 'integer', required: false, description: 'Offset amount of resources.' })
  @ApiQuery({ name: 'as_references', type: 'integer', required: false, description: 'Request list as a references' })
  @ApiOkResponse({ description: 'Get many base response', type: ListResponseDto })
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAllLocation(@Headers() headers: any, @Query() query: any) {
    const user = headers['x-member'];
    
    return this.locationSvc.readLocation(query);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ description: 'Retrieved task by ID successfully', type: SingleLocationDto, isArray: true })
  @Get(':id')
  getPositionTypeByUUID(@Param() { id }: FindOneParams) {
    return this.locationSvc.readLocation(undefined, id);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiOkResponse({ description: 'Get create one base response', type: CreateResponseDto})
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async createLocation(@Headers() headers: any, @Body() location: CreateLocationDto) {
    const user = headers['x-member'];

    if (location.nama === undefined) throw new BadRequestException('Nama lokasi wajib diisi.');
    if (location.nama_gedung === undefined) throw new BadRequestException('Nama gedung wajib diisi.');
    if (location.alamat === undefined) throw new BadRequestException('Alamat lokasi wajib diisi.');
    if (location.latitude === undefined) throw new BadRequestException('Latitude wajib diisi.');
    if (location.longitude === undefined) throw new BadRequestException('Longitude wajib diisi.');

    location.user_input = user;
    location.flag_aktif = 1;

    return this.locationSvc.createLocation(location);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async updateLocation(@Headers() headers: any, @Param() { id }: FindOneParams, @Body() location: UpdateLocationDto) {
    const user = headers['x-member'];

    if (location.nama === undefined) throw new BadRequestException('Nama lokasi wajib diisi.');
    if (location.nama_gedung === undefined) throw new BadRequestException('Nama gedung wajib diisi.');
    if (location.alamat === undefined) throw new BadRequestException('Alamat lokasi wajib diisi.');
    if (location.latitude === undefined) throw new BadRequestException('Latitude wajib diisi.');
    if (location.longitude === undefined) throw new BadRequestException('Longitude wajib diisi.');
    
    location.user_update = user;

    return this.locationSvc.updateLocation(id, location);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @Put(':id/active')
  @UseInterceptors(ClassSerializerInterceptor)
  async activeDeactiveLocation(@Headers() headers: any, @Param() { id }: FindOneParams, @Body() location: StatusDataDto) {
    const user = headers['x-member'];
    const findLocation = await this.locationSvc.getLocationByUUID(id);

    // if (location.flag_aktif === undefined) throw new BadRequestException('Flag aktif tidak boleh kosong.');
    location.flag_aktif = findLocation.flag_aktif === 1 ? 0 : 1;
    location.user_update = user;

    return this.locationSvc.updateLocation(id, location);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async deleteLocation(@Headers() headers: any, @Param() { id }: FindOneParams) {
    const user = headers['x-member'];
    return this.locationSvc.deleteLocation(id);
  }
}
