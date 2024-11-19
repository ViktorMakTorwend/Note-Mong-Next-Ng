import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { HTTPTopicService } from '../../services/http-topic.service';

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
  addTopicForm = this.fb.group({
    title: this.fb.control('', [Validators.required, AddTopicComponent.isTitleLetterUpperCase]),
    description: this.fb.control('', Validators.required),
  })

  constructor(
    private fb: FormBuilder,
    private topicService: HTTPTopicService
  ) { }

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

  register(): void {
    const topicForm: any = {
      title: this.addTopicForm.value.title,
      description: this.addTopicForm.value.description,
    }
    const topic = this.topicService.saveTopic(topicForm).subscribe(data => console.log(data));
  }
}
