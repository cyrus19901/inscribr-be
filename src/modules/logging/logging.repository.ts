import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { LoggingEntity } from '@entities/logging.entity';
import { CreateLoggingDto } from './dto/create-logging.dto';

@Injectable()
export class LoggingRepository extends Repository<LoggingEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(LoggingEntity, dataSource.createEntityManager());
  }

  async createLog(dto: CreateLoggingDto): Promise<LoggingEntity> {
    const logging = this.create(dto);
    return await this.save(logging);
  }
}
