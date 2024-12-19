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
  }
  public dataSource = new BehaviorSubject(this.topic);
  //public dataSource = new AsyncSubject();
  //currentData = this.dataSource.asObservable();

  constructor() { }

  transmitData(topic: TopicModel) {
    console.log("EMITTING DATA...", topic)
    this.dataSource.next(topic);
  }
}
