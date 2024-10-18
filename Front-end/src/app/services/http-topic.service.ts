import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HTTPTopicService {

  constructor(private http: HttpClient) { }

  // getTitleByName(name: string): Observable<any> {
  //   let titleName: Observable<any> = this.http
  //     .get<any>(`http://localhost:3000/users?name=${name}`);
  //   return titleName;
  // }

}
