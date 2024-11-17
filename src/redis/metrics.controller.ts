/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly redisService: RedisService) {}

  //Current
  // current temperature value
  @Get('temperature/current')
  async getCurrentTemperature(): Promise<number | string> {
    const data = await this.redisService.getRangeFromList('temperature_data', -1, -1); // Get the last entry
    if (data.length > 0) {
      const [timestamp, jsonString] = data[0].split(' - ');
      const parsedJson = JSON.parse(jsonString);
      return parsedJson.temperature || 'No temperature data available';
    }
    return 'No temperature data available';
  }

  // current humidity value
  @Get('humidity/current')
  async getCurrentHumidity(): Promise<number | string> {
    const data = await this.redisService.getRangeFromList('humidity_data', -1, -1); // Get the last entry
    if (data.length > 0) {
      const [timestamp, jsonString] = data[0].split(' - ');
      const parsedJson = JSON.parse(jsonString);
      return parsedJson.humidity || 'No humidity data available';
    }
    return 'No humidity data available';
  }

  // current product count value
  @Get('product-count/current')
  async getCurrentProductCount(): Promise<number | string> {
    const data = await this.redisService.getRangeFromList('product_count_data', -1, -1); // Get the last entry
    if (data.length > 0) {
      const [timestamp, jsonString] = data[0].split(' - ');
      const parsedJson = JSON.parse(jsonString);
      return parsedJson.productCount || 'No product count data available';
    }
    return 'No product count data available';
  }


  //Average
  //temperature average
  @Get('temperature/average')
  async getTemperatureAverage(): Promise<number> {
    const data = await this.redisService.filterLastHourData('temperature_data');
    const numericData = data.filter(value => typeof value === 'number');
    return numericData.length > 0 ? parseFloat((numericData.reduce((sum, value) => sum + value, 0) / numericData.length).toFixed(2)) : 0;
  }

  //humidity average
  @Get('humidity/average')
  async getHumidityAverage(): Promise<number> {
    const data = await this.redisService.filterLastHourData('humidity_data');
    return data.length > 0 ? parseFloat((data.reduce((sum, value) => sum + value, 0) / data.length).toFixed(2)) : 0;
  }

  //product count average
  @Get('product-count/average')
  async getProductCountAverage(): Promise<number> {
    const data = await this.redisService.filterLastHourData('product_count_data');
    return data.length > 0 ? parseFloat((data.reduce((sum, value) => sum + value, 0) / data.length).toFixed(2)) : 0;
  }

  //Maximum values
  //temperature maximum
  @Get('temperature/max')
  async getMaxTemperature(): Promise<number> {
    const data = await this.redisService.filterLastHourData('temperature_data');
    const numericData = data.filter(value => typeof value === 'number');
    return numericData.length > 0 ? parseFloat(Math.max(...numericData).toFixed(2)) : 0;
  }

  //humidity max
  @Get('humidity/max')
  async getMaxHumidity(): Promise<number> {
    const data = await this.redisService.filterLastHourData('humidity_data');
    const numericData = data.filter(value => typeof value === 'number');
    return numericData.length > 0 ? parseFloat(Math.max(...numericData).toFixed(2)) : 0;
  }

  //product count max
  @Get('product-count/max')
  async getMaxProductCount(): Promise<number> {
    const data = await this.redisService.filterLastHourData('product_count_data');
    const numericData = data.filter(value => typeof value === 'number');
    return numericData.length > 0 ? parseFloat(Math.max(...numericData).toFixed(2)) : 0;
  }
}
