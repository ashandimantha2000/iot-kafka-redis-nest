/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ProducerService } from 'src/kafka/producer/producer.service';

@Injectable()
export class IotService {

    constructor(private readonly _kafka: ProducerService){}
    async create() {
        console.log('Create method called');
        this._kafka.produce({topic:'create-iot', messages:[{value:'this is iot create'}]});
    }
    async update() {
        console.log('Update method called');
        this._kafka.produce({topic:'update-iot', messages:[{value:'this is iot update'}]});
    }
    
}
