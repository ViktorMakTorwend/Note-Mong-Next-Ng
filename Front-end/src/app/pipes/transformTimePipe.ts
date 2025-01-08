import { isStandalone, Pipe, PipeTransform } from "@angular/core";
import { format } from 'date-fns/format';
import { enUS } from "date-fns/locale";

@Pipe({
    name: 'transformTimePipe',
    standalone: true,
})
export class TransformTimePipe implements PipeTransform {
    transform(value: Date, ...args: any[]) {
        const result = format(value, "do  MMMM yyyy hh:mm", {
            locale: enUS
        })
        return result;
    }
} 