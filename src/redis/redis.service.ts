/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private client;

  constructor() {
    this.client = createClient({ url: 'redis://localhost:6379' });
    this.client.connect();
    this.client.on('error', (err) => console.error('Redis Client Error', err));
  }

  async pushToList(listKey: string, value: string): Promise<void> {
    await this.client.rPush(listKey, value);
  }

  async getRangeFromList(listKey: string, start: number, end: number): Promise<string[]> {
    return this.client.lRange(listKey, start, end);
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  //Average
  async filterLastHourData(listKey: string): Promise<number[]> {
    const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
    const allData = await this.getRangeFromList(listKey, 0, -1);
  
    return allData
      .map((entry) => {
        try {
          const [timestamp, jsonString] = entry.split(' - ');
          const parsedJson = JSON.parse(jsonString);
  
          // Extract the relevant value from the JSON
          let numericValue: number | null = null;
          if (parsedJson.temperature !== undefined) {
            numericValue = parsedJson.temperature; // For temperature
          } else if (parsedJson.humidity !== undefined) {
            numericValue = parsedJson.humidity; // For humidity
          } else if (parsedJson.productCount !== undefined) {
            numericValue = parsedJson.productCount; // For product count
          }
  
          // Handle cases where the value is invalid or undefined
          if (numericValue === null || isNaN(numericValue)) {
            console.warn(`Invalid or missing numeric value in entry: ${entry}`);
            return null;
          }
  
          return { timestamp, value: numericValue };
        } catch (error) {
          console.error(`Error parsing entry: ${entry}`, error);
          return null;
        }
      })
      .filter((data) => data && data.timestamp > oneHourAgo)
      .map((data) => data.value);
  }
  
  
  
}
