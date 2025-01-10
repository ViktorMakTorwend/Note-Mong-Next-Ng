import { Injectable } from '@angular/core';
import { HTTPTopicService } from './http-topic.service';
import { CommonI } from '../interfaces/commonI';
import { format } from 'date-fns';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService implements CommonI {

  constructor(
    private httpTopicService: HTTPTopicService,
  ) { }

  createMandatoryTopic(): void {
    const currentDate = format(new Date(), "yyyy-MM-dd");

    this.httpTopicService.getTopicByDate(currentDate, true, "Sport")
      .subscribe(result => {
        if (result == null) {
          const sport = {
            mandatory: true,
            title: "Sport",
            description: "Running, pull-ups, exercises on the bars, push-ups.",
            time: new Date(),
          }
          const sportSubscription = this.httpTopicService.saveTopic(sport).subscribe(data => console.log("CREATED MANDATORY TOPIC: ", data));
          sportSubscription.unsubscribe()
        }
      });

    this.httpTopicService.getTopicByDate(currentDate, true, "English")
      .subscribe(result => {
        if (result == null) {
          const eng = {
            mandatory: true,
            title: "English",
            description: "Memrise 20 000 points, Britlex 50 words, listening eng speech min 15 minutes.",
            time: new Date(),
          }
          const engSubscription = this.httpTopicService.saveTopic(eng).subscribe(data => console.log("CREATED MANDATORY TOPIC: ", data));
          engSubscription.unsubscribe();
        }
      });
  }

}
