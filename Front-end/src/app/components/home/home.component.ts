import { Component } from '@angular/core';
import { TopicComponent } from '../topic/topic.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TopicModel } from '../../types/topicModel';
import { AddTopicComponent } from '../add-topic/add-topic.component';

@Component({
  selector: 'eva-home',
  standalone: true,
  imports: [
    CommonModule,
    TopicComponent,
    AddTopicComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  //topics!: Observable<Array<TopicModel | undefined>> = [];
}
