import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TopicModel } from '../types/topicModel';

@Injectable({
  providedIn: 'root'
})
export class HTTPTopicService {

  constructor(private http: HttpClient) { }

  getTopics(): Observable<any> {
    const headers = { 
      'content-type': 'application/json',
      'Access-Control-Allow-Methods': 'GET POST PUT',
      'Access-Control-Allow-Headers': 'Content-Type'
    };  
    let topics: Observable<any> = this.http
      .get<any>(`http://localhost:3000/topics`, { headers: headers });
    return topics;
  }

  getTitleByName(name: string): Observable<any> {
    const headers = { 
      'content-type': 'application/json',
      'Access-Control-Allow-Methods': 'GET POST PUT DELETE',
      'Access-Control-Allow-Headers': 'Content-Type'
    };  
    let titleName: Observable<any> = this.http
      .get<any>(`http://localhost:3000/topics/findByName/:${name}`, { headers: headers });
    return titleName;
  }

  saveTopic(topic: any): Observable<any> {
    const headers = { 
      'content-type': 'application/json',
      'Access-Control-Allow-Methods': 'GET POST PUT DELETE',
      'Access-Control-Allow-Headers': 'Content-Type'
    };  
    const body=JSON.stringify(topic);
    return this.http.post<any>('http://localhost:3000/topics', body, { headers: headers });
  }

  changeTopic(topicId: string, topic: any): Observable<any> {
    const headers = { 
      'content-type': 'application/json',
      'Access-Control-Allow-Methods': 'GET POST PUT DELETE',
      'Access-Control-Allow-Headers': 'Content-Type'
    };  
    const body=JSON.stringify(topic);
    return this.http.patch<any>(`http://localhost:3000/topics/${topicId}`, body, { headers: headers });
  }

  deleteTopic(topic: any) {
    const headers = { 
      'content-type': 'application/json',
      'Access-Control-Allow-Methods': 'GET POST PUT DELETE',
      'Access-Control-Allow-Headers': 'Content-Type'
    };  
    return this.http.delete(`http://localhost:3000/topics/${topic._id}`, { headers: headers });
  }

}
