import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';

@Pipe({
    name: "timePassedAfterCreationPipe",
    standalone: true
})
export class TimePassedAfterCreationPipe implements PipeTransform {
    transform(value: Date, ...args: any[]) {
        return formatDistanceToNowStrict(value, {addSuffix: true}).toString()
    }
}