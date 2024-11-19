import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TopicModel } from '../../types/topicModel';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TransmitDataBtwComponentsService } from '../../services/transmit-data-betw-components.service';

@Component({
  selector: 'eva-topic',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent {
  @Input()
  public topic: TopicModel = {
    title: "",
    description: "",
    _id: "",
  };

  constructor(private dataTransmit: TransmitDataBtwComponentsService) {}

  @Output()
  readonly deletedTopic = new EventEmitter<TopicModel>();

  deleteTopic() {
    this.deletedTopic.emit(this.topic);
  }

  editTopicTransmitData() {
    this.dataTransmit.transmitData(this.topic);
  }

}
