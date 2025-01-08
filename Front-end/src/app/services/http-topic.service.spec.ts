import { TestBed, waitForAsync } from '@angular/core/testing';
import { HTTPTopicService } from './http-topic.service';
import { HttpClient } from '@angular/common/http';
import { of, from } from 'rxjs';
import { TopicModel } from '../types/topicModel';

fdescribe('HTTPTopicService', () => {
  let service: HTTPTopicService;
  const httpService = jasmine.createSpyObj<HttpClient>('HttpClient', ['get', 'post', 'patch', 'delete']);
  const headers = { 
    'content-type': 'application/json',
    'Access-Control-Allow-Methods': 'GET POST PUT DELETE PATCH',
    'Access-Control-Allow-Headers': 'Content-Type'
  }; 
  const testTopic: TopicModel = {
      title: "test title",
      description: "test desc",
      time: new Date("11.11.11"),
      _id: "11111"
  };
  const testTopicEdit: TopicModel = {
    title: "test title edit",
    description: "test desc edit",
    time: new Date("11.11.12"),
    _id: "11111"
};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: HttpClient,
        useValue: httpService,
      }]
    });
    service = TestBed.inject(HTTPTopicService);
  });

  it('Verify getTopics()', waitForAsync(() => {
    httpService.get.and.returnValue(of([testTopic]))
    service.getTopics().subscribe(topics => {
      expect(topics.length).toBe(1);
      expect(httpService.get).toHaveBeenCalledWith(`http://localhost:3000/topics`, { headers: headers });
    });
  }));

  it('Verify getTitleByName()', waitForAsync(() => {
    httpService.get.and.returnValue(from([testTopic.title]))
    service.getTitleByName(testTopic.title).subscribe(title => {
      expect(title).toBe(testTopic.title);
      expect(httpService.get).toHaveBeenCalledWith(`http://localhost:3000/topics/findByName/${testTopic.title}`, { headers: headers });
    });
  }));

  it('Verify saveTopic()', waitForAsync(() => {
    httpService.post.and.returnValue(from([testTopic]));
    const body=JSON.stringify(testTopic);
    service.saveTopic(testTopic).subscribe(topic => {
      expect(topic.title).toBe(testTopic.title);
      expect(httpService.post).toHaveBeenCalledWith(`http://localhost:3000/topics`, body, { headers: headers });
    });
  }));

  it('Verify changeTopic()', waitForAsync(() => {
    httpService.patch.and.returnValue(from([testTopicEdit]));
    const body=JSON.stringify(testTopicEdit);
    service.changeTopic(testTopicEdit).subscribe(() => {
      expect(httpService.patch).toHaveBeenCalledWith(`http://localhost:3000/topics/${testTopic._id}`, body, { headers: headers });
    });
  }));

  it('Verify deleteTopic()', waitForAsync(() => {
    httpService.delete.and.returnValue(from([testTopic]));
    service.deleteTopic(testTopic).subscribe(() => {
      expect(httpService.delete).toHaveBeenCalledWith(`http://localhost:3000/topics/${testTopic._id}`, { headers: headers });
    });
  }));

});
