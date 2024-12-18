import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { map, Observable, Subscription } from 'rxjs';
import { HTTPTopicService } from '../../services/http-topic.service';
import { TopicModel } from '../../types/topicModel';
import { TransmitDataBtwComponentsService } from '../../services/transmit-data-betw-components.service';

@Component({
  selector: 'eva-edit-topic',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-topic.component.html',
  styleUrl: './edit-topic.component.css',
})
export class EditTopicComponent {
  private topic: TopicModel = {
    title: "",
    description: "",
    _id: "",
  }
  public addTopicForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private topicService: HTTPTopicService,
    private dataTransmit: TransmitDataBtwComponentsService,
  ) {
    this.dataTransmit.currentData.subscribe(data => {
      this.topic.title = data.title;
      this.topic.description = data.description;
      this.topic._id = data._id;
    });
    this.addTopicForm = this.fb.group({
      title: this.fb.control(this.topic.title, 
        [ Validators.required, 
          EditTopicComponent.isTitleLetterUpperCase, 
          this.isTitleAvailable]),
      description: this.fb.control(this.topic.description, Validators.required),
    });
  }

  static isTitleLetterUpperCase(control: AbstractControl): Validators | null {
    const titleLetter = control.value;
    return titleLetter == titleLetter.toUpperCase() ? null : { notInUpperCase: true }
  }

  isTitleAvailable(control: AbstractControl): Observable<ValidationErrors | null> {
    const titleName = control.value;
    return this.topicService
      .getTitleByName(titleName)
      .pipe(map(available => (available.length == 0 ? null : { alreadyUsed: true })))
  }

  saveEditedTopic(): void {
    const topicForm: any = {
      title: this.addTopicForm.value.title,
      description: this.addTopicForm.value.description,
    }
    this.topicService.changeTopic(this.topic._id!, topicForm).subscribe(data => console.log(data));
  }

}
