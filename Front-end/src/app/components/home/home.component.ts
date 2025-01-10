import { Component, OnInit } from '@angular/core';
import { TopicComponent } from '../topic/topic.component';
import { CommonModule, NgIf } from '@angular/common';
import { TopicModel } from '../../types/topicModel';
import { HTTPTopicService } from '../../services/http-topic.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'eva-home',
  standalone: true,
  imports: [
    CommonModule,
    TopicComponent,
    NgIf,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  topics$: Array<TopicModel> = [];

  constructor(
    private topicService: HTTPTopicService,
    private commonService: CommonService,
  ) {
    
  }
  ngOnInit(): void {
    this.commonService.createMandatoryTopic();
    setTimeout(() => {
      this.topicService.getTopics().subscribe(data => this.topics$ = data);
    }, 1000);
    
  }

  deleteTopic(topic: TopicModel) {
    this.topicService.deleteTopic(topic).subscribe(data => console.log("Deleted topic", data));
    this.topicService.getTopics().subscribe(data => this.topics$ = data);
  }

}
