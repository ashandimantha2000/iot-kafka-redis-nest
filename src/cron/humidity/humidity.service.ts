/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ProducerService } from '../../kafka/producer/producer.service'; 

@Injectable()
export class HumidityService {
  private readonly logger = new Logger(HumidityService.name);

  constructor(private readonly producerService: ProducerService) {} // Inject ProducerService

  @Cron('*/2 * * * * *') // Runs every 2 seconds
  async handleCron() {
    const humidity = this.generateRandomNumber(20, 50);

    this.logger.log(`Humidity: ${humidity}%`);

    // Send humidity data to Kafka
    await this.producerService.produce({
      topic: 'humidity_data',
      messages: [{ value: JSON.stringify({ humidity }) }],
    });
  }

  private generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
