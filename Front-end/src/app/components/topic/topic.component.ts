import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TopicModel } from '../../types/topicModel';
import { RouterModule } from '@angular/router';
import { TransmitDataBtwComponentsService } from '../../services/transmit-data-betw-components.service';
import { TimePassedAfterCreationPipe } from '../../pipes/timePassedAfterCreationPipe'
import { TransformTimePipe } from '../../pipes/transformTimePipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'eva-topic',
  standalone: true,
  imports: [
    RouterModule,
    TimePassedAfterCreationPipe,
    TransformTimePipe,
    NgClass,
  ],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent {
  @Input()
  public topic: TopicModel = {
    mandatory: false,
    title: "",
    description: "",
    _id: "",
    time: new Date(),
  };

  constructor(private dataTransmit: TransmitDataBtwComponentsService) {}

  @Output()
  readonly emittedTopic = new EventEmitter<TopicModel>();

  topicForDelete() {
    this.emittedTopic.emit(this.topic);
  }

  topicForEdit() {
    this.dataTransmit.transmitData(this.topic);
  }

}
