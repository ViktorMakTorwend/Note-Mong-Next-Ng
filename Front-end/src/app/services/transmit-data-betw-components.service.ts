import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TopicModel } from '../types/topicModel';

@Injectable({
  providedIn: 'root'
})
export class TransmitDataBtwComponentsService {
  private topic: TopicModel = {
    title: "",
    description: "",
    _id: "",
  }
  private dataSource = new BehaviorSubject(this.topic);
  currentData = this.dataSource.asObservable();

  constructor() { }

  transmitData(topic: TopicModel) {
    this.dataSource.next(topic);
  }
}
