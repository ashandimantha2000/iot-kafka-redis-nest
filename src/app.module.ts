/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';
import { IotModule } from './iot/iot.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TemperatureService } from './cron/temperature/temperature.service';
import { HumidityService } from './cron/humidity/humidity.service';
import { ProductCountService } from './cron/product-count/product-count.service';
import { KafkaConsumerInitService } from './iot/KafkaConsumerInitService';
import { RedisService } from './redis/redis.service';


@Module({
  imports: [KafkaModule, IotModule, ScheduleModule.forRoot()],
  providers: [TemperatureService, HumidityService, ProductCountService, KafkaConsumerInitService, RedisService],

})
export class AppModule {}
