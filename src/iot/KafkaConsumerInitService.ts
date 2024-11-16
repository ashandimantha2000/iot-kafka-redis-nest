/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../kafka/consumer/consumer.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class KafkaConsumerInitService implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly redisService: RedisService,
  ) {}

  async onModuleInit() {
    // Temperature
    await this.consumerService.consume(
      'temperature-group',
      { topic: 'temperature_data' },
      {
        eachMessage: async ({ message }) => {
          const value = message.value?.toString();
          console.log(`Received temperature data: ${value}`);
          await this.redisService.set('temperature_data', value);
        },
      },
    );

    // Humidity
    await this.consumerService.consume(
      'humidity-group',
      { topic: 'humidity_data' },
      {
        eachMessage: async ({ message }) => {
          const value = message.value?.toString();
          console.log(`Received humidity data: ${value}`);
          await this.redisService.set('humidity_data', value);
        },
      },
    );

    // Product Count
    await this.consumerService.consume(
      'product-count-group',
      { topic: 'product_count_data' },
      {
        eachMessage: async ({ message }) => {
          const value = message.value?.toString();
          console.log(`Received product data: ${value}`);
          await this.redisService.set('product_count_data', value);
        },
      },
    );
  }
}
