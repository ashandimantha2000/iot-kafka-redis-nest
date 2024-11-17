/* eslint-disable prettier/prettier */
//Name of this file is may be like humidity.cosumer.ts, temperature.consumer.ts .... But here I combined them and add them to here.
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
          const parsedValue = JSON.parse(value);
          const timestampedValue = `${new Date().toISOString()} - ${JSON.stringify(parsedValue)}`;
          console.log(`Received temperature data: ${timestampedValue}`);
          await this.redisService.pushToList(
            'temperature_data',
            timestampedValue,
          );
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
          const parsedValue = JSON.parse(value);
          const timestampedValue = `${new Date().toISOString()} - ${JSON.stringify(parsedValue)}`;
          console.log(`Received humidity data: ${timestampedValue}`);
          await this.redisService.pushToList('humidity_data', timestampedValue);
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
          const parsedValue = JSON.parse(value);
          const timestampedValue = `${new Date().toISOString()} - ${JSON.stringify(parsedValue)}`;
          console.log(`Received product data: ${timestampedValue}`);
          await this.redisService.pushToList(
            'product_count_data',
            timestampedValue,
          );
        },
      },
    );
  }
}
