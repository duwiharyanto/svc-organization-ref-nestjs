import { ClassSerializerInterceptor, Controller, Get, Headers, Param, UseInterceptors } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ListResponseDto } from 'src/shared/dto/list-response.dto';
import FindOneParams from 'src/shared/utils/find-one-params';
import { AccreditationService } from './accreditation.service';
import { SingleAccreditationDto } from './dto/single-accreditation.dto';

@ApiTags('Akreditasi')
@Controller('/public/api/v1/accreditation')
export class AccreditationController {
  constructor(
    private readonly accreditationSvc: AccreditationService
  ) {}
  
  @ApiHeader({ name: 'X-Member' })
  @ApiQuery({ name: 'limit', type: 'integer', required: false, description: 'Limit amount of resources' })
  @ApiQuery({ name: 'offset', type: 'integer', required: false, description: 'Offset amount of resources.' })
  @ApiOkResponse({ description: 'Get many base response', type: ListResponseDto })
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAllLocation(@Headers() headers: any) {
    const user = headers['x-member'];
    
    return this.accreditationSvc.readAccreditation();
  }

  @ApiHeader({ name: 'X-Member' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ description: 'Retrieved task by ID successfully', type: SingleAccreditationDto, isArray: true })
  @Get(':id')
  getPositionTypeByUUID(@Param() { id }: FindOneParams) {
    return this.accreditationSvc.readAccreditation(id);
  }
}
