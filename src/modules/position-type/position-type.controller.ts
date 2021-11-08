import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import FindOneParams from 'src/shared/utils/find-one-params';
import { CreatePositionTypeDto } from './dto/create-position-type.dto';
import { PositionTypeService } from './position-type.service';
import { ListResponseDto } from 'src/shared/dto/list-response.dto';
import { SinglePositionTypeDto } from './dto/single-position-type.dto';
import { CreateResponseDto } from 'src/shared/dto/create-response.dto';
import { UpdatePositionTypeDto } from './dto/update-position-type.dto';
import { StatusDataDto } from 'src/shared/dto/status-data.dto';

@ApiTags('Jenis Jabatan')
@Controller('position-type')
export class PositionTypeController { 
  constructor(
    private readonly positionTypeSvc: PositionTypeService
  ) {}
  
  @ApiQuery({ name: 'limit', type: 'integer', required: false, description: 'Limit amount of resources' })
  @ApiQuery({ name: 'offset', type: 'integer', required: false, description: 'Offset amount of resources.' })
  @ApiOkResponse({ description: 'Get many base response', type: ListResponseDto })
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAllPositionType() {
    return this.positionTypeSvc.readPositionType();
  }

  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ description: 'Retrieved task by ID successfully', type: SinglePositionTypeDto, isArray: true })
  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  getPositionTypeByUUID(@Param() { id }: FindOneParams) {
    return this.positionTypeSvc.readPositionType(id);
  }

  @ApiOkResponse({ description: 'Get create one base response', type: CreateResponseDto})
  @Post()
  // @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async createPositionType(@Body() positionType: CreatePositionTypeDto) {
    return this.positionTypeSvc.createPositionType(positionType);
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async updatePositionType(@Param() { id }: FindOneParams, @Body() positionType: UpdatePositionTypeDto) {
    return this.positionTypeSvc.updatePositionType(id, positionType);
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Patch(':id/status')
  @UseInterceptors(ClassSerializerInterceptor)
  async activeDeactivePositionType(@Param() { id }: FindOneParams, @Body() positionType: StatusDataDto) {
    return this.positionTypeSvc.updatePositionType(id, positionType);
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async deletePositionType(@Param() { id }: FindOneParams) {
    return this.positionTypeSvc.deletePositionType(id);
  }
}
