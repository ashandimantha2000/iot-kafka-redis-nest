/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { MetricsController } from './metrics.controller';

@Module({
  controllers: [MetricsController],
  providers: [RedisService],
})
export class RedisModule {}
