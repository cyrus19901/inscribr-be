import { BadRequestException, Injectable } from '@nestjs/common';

import { LoggingRepository } from './logging.repository';
import { CreateLoggingDto } from './dto/create-logging.dto';
import { LoggingDto } from './dto/logging.dto';

@Injectable()
export class LoggingService {
  constructor(private readonly loggingRepository: LoggingRepository) {}

  async createLog(logging: CreateLoggingDto): Promise<LoggingDto> {
    try {
      logging.loggedAt = new Date();
      const result = await this.loggingRepository.createLog(logging);
      return result;
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }
}
