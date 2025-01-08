import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogService } from './log.service';
import { ServiceTypeEnum } from '../enums/appEnums';

@Injectable({
  providedIn: 'root'
})
export class HTTPTopicService {

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

  getTitleByName(name: string): Observable<string> {
    let titleName: Observable<string> = this.http
      .get<any>(`http://localhost:3000/topics/findByName/${name}`, { headers: this.headers });
    return titleName;
  }

  saveTopic(topic: any): Observable<any> {
    const body=JSON.stringify(topic);
    return this.http.post<any>('http://localhost:3000/topics', body, { headers: this.headers });
  }

  changeTopic(topic: any): Observable<any> {
    const body=JSON.stringify(topic);
    return this.http.patch<any>(`http://localhost:3000/topics/${topic._id}`, body, { headers: this.headers });
  }

  deleteTopic(topic: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/topics/${topic._id}`, { headers: this.headers });
  }

}
