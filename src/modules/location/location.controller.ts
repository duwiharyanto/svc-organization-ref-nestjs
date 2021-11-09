import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateResponseDto } from 'src/shared/dto/create-response.dto';
import { ListResponseDto } from 'src/shared/dto/list-response.dto';
import { StatusDataDto } from 'src/shared/dto/status-data.dto';
import FindOneParams from 'src/shared/utils/find-one-params';
import { CreateLocationDto } from './dto/create-location.dto';
import { SingleLocationDto } from './dto/single-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationService } from './location.service';

@ApiTags('Lokasi')
@Controller('location')
export class LocationController { 
  constructor(
    private readonly locationSvc: LocationService
  ) {}
  
  @ApiQuery({ name: 'limit', type: 'integer', required: false, description: 'Limit amount of resources' })
  @ApiQuery({ name: 'offset', type: 'integer', required: false, description: 'Offset amount of resources.' })
  @ApiOkResponse({ description: 'Get many base response', type: ListResponseDto })
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAllLocation() {
    return this.locationSvc.readLocation();
  }

  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ description: 'Retrieved task by ID successfully', type: SingleLocationDto, isArray: true })
  @Get(':id')
  getPositionTypeByUUID(@Param() { id }: FindOneParams) {
    return this.locationSvc.readLocation(id);
  }

  @ApiOkResponse({ description: 'Get create one base response', type: CreateResponseDto})
  @Post()
  // @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async createLocation(@Body() location: CreateLocationDto) {
    return this.locationSvc.createLocation(location);
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async updateLocation(@Param() { id }: FindOneParams, @Body() location: UpdateLocationDto) {
    return this.locationSvc.updateLocation(id, location);
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Patch(':id/status')
  @UseInterceptors(ClassSerializerInterceptor)
  async activeDeactiveLocation(@Param() { id }: FindOneParams, @Body() location: StatusDataDto) {
    return this.locationSvc.updateLocation(id, location);
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async deleteLocation(@Param() { id }: FindOneParams) {
    return this.locationSvc.deleteLocation(id);
  }
}
