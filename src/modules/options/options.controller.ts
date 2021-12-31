import { BadRequestException, ClassSerializerInterceptor, Controller, Get, Headers, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ListResponseDto } from 'src/shared/dto/list-response.dto';
import FindOneParams from 'src/shared/utils/find-one-params';
import { SingleReferenceDto } from './dto/single-reference.dto';
import { OptionsService } from './options.service';

@ApiTags('Reference')
@Controller('/public/api/v1/options')
export class OptionsController { 
  constructor(
    private readonly optionsSvc: OptionsService
  ) {}
  
  @ApiHeader({ name: 'X-Member' })
  @ApiQuery({ name: 'limit', type: 'integer', required: false, description: 'Limit amount of resources' })
  @ApiQuery({ name: 'offset', type: 'integer', required: false, description: 'Offset amount of resources.' })
  @ApiQuery({ name: 'kelompok', type: 'string', required: false, description: 'Kelompok opsional.' })
  @ApiOkResponse({ description: 'Get many base response', type: ListResponseDto })
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAllOptions(@Headers() headers: any, @Query() query: any) {
    const user = headers['x-member'];

    if (!query.kelompok) throw new BadRequestException('Kelompok wajib diisi.');
    
    return this.optionsSvc.readReference(query);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiQuery({ name: 'cari', type: 'string', required: true, description: 'Kata kunci pencarian.' })
  @ApiOkResponse({ description: 'Get many base response', type: ListResponseDto })
  @Get('personnel')
  @UseInterceptors(ClassSerializerInterceptor)
  getPersonnelOptions(@Headers() headers: any, @Query() query: any) {
    const user = headers['x-member'];

    if (!query.cari) throw new BadRequestException('Kata kunci pencarian wajib diisi.');
    
    return this.optionsSvc.searchPersonnel(query);
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ description: 'Retrieved task by ID successfully', type: SingleReferenceDto, isArray: true })
  @Get(':id')
  getPositionTypeByUUID(@Param() { id }: FindOneParams) {
    return this.optionsSvc.readReference({}, id);
  }
}
