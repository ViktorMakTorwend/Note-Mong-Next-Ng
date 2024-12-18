import { Component, OnInit } from '@angular/core';
import { TopicComponent } from '../topic/topic.component';
import { CommonModule, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { TopicModel } from '../../types/topicModel';
import { HTTPTopicService } from '../../services/http-topic.service';

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
    private topicService: HTTPTopicService
  ) {
    
  }
  ngOnInit(): void {
    this.topicService.getTopics().subscribe(data => this.topics$ = data);
  }

  deleteTopic(topic: TopicModel) {
    this.topicService.deleteTopic(topic).subscribe(data => console.log(data));
    this.topicService.getTopics().subscribe(data => this.topics$ = data);
  }

}
