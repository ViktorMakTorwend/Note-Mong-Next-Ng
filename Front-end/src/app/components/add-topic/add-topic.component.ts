import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { HTTPTopicService } from '../../services/http-topic.service';
import { TopicModel } from '../../types/topicModel';

@Component({
  selector: 'eva-add-topic',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-topic.component.html',
  styleUrl: './add-topic.component.css',
})
export class AddTopicComponent {

  constructor(
    private fb: FormBuilder,
    private topicService: HTTPTopicService
  ) { }

  addTopicForm = this.fb.group({
    title: new FormControl(
      '',
      {
        validators: [Validators.required, AddTopicComponent.isTitleLetterUpperCase],
        asyncValidators: [this.isTitleAvailable()],
        updateOn: 'change'
      }),
    description: ['', Validators.required]
  })

  static isTitleLetterUpperCase(control: AbstractControl): Validators | null {
    const titleLetter = control.value;
    return titleLetter == titleLetter.toUpperCase() ? null : { notInUpperCase: true }
  }

  isTitleAvailable(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return this.topicService
        .getTitleByName(control.value)
        .pipe(map(available => available === null ? null : { alreadyUsed: true }))
    }
  }

  register(): void {
    const topicForm: any = {
      title: this.addTopicForm.value.title,
      description: this.addTopicForm.value.description,
    }

    const topic = this.topicService.saveTopic(topicForm).subscribe(data => console.log("CREATED TOPIC: ", data));
    this.addTopicForm.controls.description.setValue("");
    this.addTopicForm.controls.description.markAsPristine();
    this.addTopicForm.controls.description.markAsUntouched();
    this.addTopicForm.controls.title.setValue("");
    this.addTopicForm.controls.title.markAsPristine();
    this.addTopicForm.controls.title.markAsUntouched();

  }
}
