/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ProducerService } from '../../kafka/producer/producer.service'; 

@Injectable()
export class TemperatureService {
  private readonly logger = new Logger(TemperatureService.name);

  constructor(private readonly producerService: ProducerService) {} // Inject ProducerService

  @Cron('*/1 * * * * *')
  async handleCron() {
    const temperature = this.generateRandomNumber(20, 30);
    this.logger.log(`Temperature: ${temperature}°C`);

    // Send temperature data to Kafka
    await this.producerService.produce({
      topic: 'temperature_data',
      messages: [{ value: JSON.stringify({ temperature }) }],
    });
  }

  private generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
