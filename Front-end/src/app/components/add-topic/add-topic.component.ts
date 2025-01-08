import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { map } from 'rxjs';
import { HTTPTopicService } from '../../services/http-topic.service';
import { TopicModel } from '../../types/topicModel';
import { TransmitDataBtwComponentsService } from '../../services/transmit-data-betw-components.service';
import { ActivatedRoute } from '@angular/router';
import { TransformTimePipe } from '../../pipes/transformTimePipe';

@Component({
  selector: 'eva-add-topic',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TransformTimePipe,
  ],
  templateUrl: './add-topic.component.html',
  styleUrl: './add-topic.component.css',
})
export class AddTopicComponent implements OnInit {
  public addTopicForm!: FormGroup;
  public addMode: string | null = null;
  public creationTime: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private topicService: HTTPTopicService,
    private transmitDataService: TransmitDataBtwComponentsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.addMode = this.route.snapshot.paramMap.get("addMode");
    if (this.addMode) {
      this.addTopicForm = this.fb.group({
        title: new FormControl(
          "",
          {
            validators: [Validators.required, AddTopicComponent.isTitleLetterUpperCase],
            asyncValidators: [this.isTitleAvailable()],
            updateOn: 'change'
          }),
        description: ["", Validators.required],
        time: [this.creationTime]
      })
    } else {
      const editData = this.transmitDataService.dataSource.subscribe((data: TopicModel) => {
        this.addTopicForm = this.fb.group({
          title: new FormControl(
            data.title,
            {
              validators: [Validators.required, AddTopicComponent.isTitleLetterUpperCase],
              asyncValidators: [this.isTitleAvailable()],
              updateOn: 'blur'
            }),
          description: [data.description, Validators.required],
          time: [data.time],
          _id: [data._id],
        });
      })
      editData.unsubscribe();
    }
  }

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
    const topic: TopicModel = {
      title: this.addTopicForm.value.title,
      description: this.addTopicForm.value.description,
      time: this.addTopicForm.value.time
    }
    if (this.addMode == "true") {
      this.topicService.saveTopic(topic).subscribe(data => console.log("CREATED TOPIC: ", data));
    } else {
      const _id = this.addTopicForm.value._id;
      const editTopic = { ...topic, _id }
      this.topicService.changeTopic(editTopic).subscribe(data => console.log("EDITED TOPIC: ", data));
    }
    this.clearForm("description", "title");
  }

  private clearForm(...controls: string[]) {
    for (let control of controls) {
      this.addTopicForm.controls[`${control}`].setValue("");
      this.addTopicForm.controls[`${control}`].markAsPristine();
      this.addTopicForm.controls[`${control}`].markAsUntouched();
    }
  }

}
