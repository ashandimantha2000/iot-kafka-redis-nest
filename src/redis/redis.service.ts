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

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }
}
