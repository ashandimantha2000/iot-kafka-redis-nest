/* eslint-disable prettier/prettier */
import { Controller, Post, Put } from '@nestjs/common';
import { IotService } from './iot.service';

@Controller('iot')
export class IotController {
    constructor(private _service: IotService){}

    @Post()
    async create(){
        await this._service.create();
    }

    @Put()
    async update(){
        await this._service.update();
    }
}
