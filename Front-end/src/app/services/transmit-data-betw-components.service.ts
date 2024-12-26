import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject } from 'rxjs';
import { TopicModel } from '../types/topicModel';

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

  constructor() { }

  transmitData(topic: TopicModel) {
    this.dataSource.next(topic);
  }
}
