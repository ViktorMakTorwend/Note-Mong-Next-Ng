import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject } from 'rxjs';
import { TopicModel } from '../types/topicModel';
import { LogService } from './log.service';
import { ServiceTypeEnum } from '../enums/appEnums';

@Injectable({
  providedIn: 'root'
})
export class TransmitDataBtwComponentsService {
  private topic: TopicModel = {
    title: "",
    description: "",
    _id: "",
    time: new Date()
  }
  public dataSource = new BehaviorSubject(this.topic);

  constructor(
    private logService: LogService,
  ) { }

  transmitData(topic: TopicModel) {
    this.dataSource.next(topic);
    this.logService.log("transmit topic", ServiceTypeEnum.common);
  }
}
