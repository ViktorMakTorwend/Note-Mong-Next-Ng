import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogService } from './log.service';
import { ServiceTypeEnum } from '../enums/appEnums';
import { TopicCrudI } from '../interfaces/topicCrudI';

@Injectable({
  providedIn: 'root'
})
export class HTTPTopicService implements TopicCrudI {

  constructor(
    private http: HttpClient,
    private logService: LogService,
  ) { }

  private readonly headers = {
    'content-type': 'application/json',
    'Access-Control-Allow-Methods': 'GET POST PUT DELETE PATCH',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  getTopics(): Observable<any> {
    let topics: Observable<any> = this.http
      .get<any>(`http://localhost:3000/topics`, { headers: this.headers });
    this.logService.log("get topics", ServiceTypeEnum.api);
    return topics;
  }

  getTopicByTitle(name: string): Observable<any> {
    let result: Observable<any> = this.http
      .get<any>(`http://localhost:3000/topics/findByName/${name}`, { headers: this.headers });
    return result;
  }

  getTopicByDate(date: string, mandatory: boolean, title: string): Observable<any> {
    const params = new HttpParams()
      .set('date', date)
      .set('mandatory', mandatory)
      .set('title', title)
    let result: Observable<any> = this.http
      .get<any>(`http://localhost:3000/topics/findByDate`, { headers: this.headers, params});
    return result;
  }

  saveTopic(topic: any): Observable<any> {
    console.log("FROM SAVE")
    const body = JSON.stringify(topic);
    return this.http.post<any>('http://localhost:3000/topics', body, { headers: this.headers });
  }

  changeTopic(topic: any): Observable<any> {
    const body = JSON.stringify(topic);
    return this.http.patch<any>(`http://localhost:3000/topics/${topic._id}`, body, { headers: this.headers });
  }

  deleteTopic(topic: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/topics/${topic._id}`, { headers: this.headers });
  }

}
