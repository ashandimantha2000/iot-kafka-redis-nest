/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { IotService } from './iot.service';
import { IotController } from './iot.controller';
import { KafkaModule } from '../kafka/kafka.module';
import { CreateConsumer } from './create.consumer';
import { UpdateConsumer } from './update.consumer';

@Module({
  imports: [KafkaModule],
  providers: [IotService, CreateConsumer, UpdateConsumer],
  controllers: [IotController]
})
export class IotModule {}
