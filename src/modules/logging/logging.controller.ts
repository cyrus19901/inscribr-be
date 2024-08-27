import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LoggingService } from './logging.service';
import { LoggingEntity } from '@entities/logging.entity';
import { CreateLoggingDto } from './dto/create-logging.dto';

@Controller('logging')
@ApiTags('Logging')
export class LoggingController {
  constructor(private readonly loggingService: LoggingService) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createLog(@Body() body: CreateLoggingDto): Promise<any> {
    const result = this.loggingService.createLog(body);
    return result;
  }
}
