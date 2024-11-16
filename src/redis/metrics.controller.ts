/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly redisService: RedisService) {}

  @Get('temperature/average')
  async getTemperatureAverage(): Promise<number> {
    const data = await this.redisService.filterLastHourData('temperature_data');
    const numericData = data.filter(value => typeof value === 'number');
    return numericData.length > 0 ? numericData.reduce((sum, value) => sum + value, 0) / numericData.length : 0;
  }

  @Get('humidity/average')
  async getHumidityAverage(): Promise<number> {
    const data = await this.redisService.filterLastHourData('humidity_data');
    return data.length > 0 ? data.reduce((sum, value) => sum + value, 0) / data.length : 0;
  }

  @Get('product-count/average')
  async getProductCountAverage(): Promise<number> {
    const data = await this.redisService.filterLastHourData('product_count_data');
    // console.log('hehe is' +data)
    return data.length > 0 ? data.reduce((sum, value) => sum + value, 0) / data.length : 0;
  }

  @Get('temperature/max')
  async getMaxTemperature(): Promise<number> {
    const data = await this.redisService.filterLastHourData('temperature_data');
    const numericData = data.filter(value => typeof value === 'number');
    return numericData.length > 0 ? Math.max(...numericData) : 0;
  }

  @Get('humidity/max')
  async getMaxHumidity(): Promise<number> {
    const data = await this.redisService.filterLastHourData('humidity_data');
    const numericData = data.filter(value => typeof value === 'number');
    return numericData.length > 0 ? Math.max(...numericData) : 0;
  }

  @Get('product-count/max')
  async getMaxProductCount(): Promise<number> {
    const data = await this.redisService.filterLastHourData('product_count_data');
    const numericData = data.filter(value => typeof value === 'number');
    return numericData.length > 0 ? Math.max(...numericData) : 0;
  }
}
