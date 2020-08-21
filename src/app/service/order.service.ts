import { Injectable } from '@angular/core';
import { DataBaseService } from './database.service';

@Injectable()
export class OrderService {
    constructor(private fdb: DataBaseService){
        fdb.init("order");
    }
    print(){
        this.fdb.print();
    }
}