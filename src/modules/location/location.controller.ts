import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Headers, Param, Post, Put, UseInterceptors } from '@nestjs/common';
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
  @ApiOkResponse({ description: 'Get many base response', type: ListResponseDto })
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAllLocation(@Headers() headers: any) {
    const user = headers['x-member'];
    
    return this.locationSvc.readLocation();
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ description: 'Retrieved task by ID successfully', type: SingleLocationDto, isArray: true })
  @Get(':id')
  getPositionTypeByUUID(@Param() { id }: FindOneParams) {
    return this.locationSvc.readLocation(id);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiOkResponse({ description: 'Get create one base response', type: CreateResponseDto})
  @Post()
  // @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async createLocation(@Headers() headers: any, @Body() location: CreateLocationDto) {
    const user = headers['x-member'];
    location.user_input = user;

    return this.locationSvc.createLocation(location);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async updateLocation(@Headers() headers: any, @Param() { id }: FindOneParams, @Body() location: UpdateLocationDto) {
    const user = headers['x-member'];
    location.user_update = user;

    return this.locationSvc.updateLocation(id, location);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @Put(':id/status')
  @UseInterceptors(ClassSerializerInterceptor)
  async activeDeactiveLocation(@Headers() headers: any, @Param() { id }: FindOneParams, @Body() location: StatusDataDto) {
    const user = headers['x-member'];

    if (location.flag_aktif === undefined) throw new BadRequestException('Flag aktif tidak boleh kosong.');
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
