/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ProducerService } from '../../kafka/producer/producer.service'; 

@Injectable()
export class ProductCountService {
  private readonly logger = new Logger(ProductCountService.name);

  constructor(private readonly producerService: ProducerService) {} // Inject ProducerService

  @Cron('*/5 * * * * *')
  async handleCron() {
    const productCount = this.generateRandomNumber(1, 50);
    this.logger.log(`Product Count: ${productCount}`);

    // Send product count data to Kafka
    await this.producerService.produce({
      topic: 'product_count_data',
      messages: [{ value: JSON.stringify({ productCount }) }],
    });
  }

  private generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
