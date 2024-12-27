import { Injectable } from '@angular/core';
import { ServiceTypeEnum } from '../enums/appEnums';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  log(message: string, serviceType: ServiceTypeEnum): void {
    let serviceColor = "";
    switch(serviceType) {
      case ServiceTypeEnum.common : serviceColor = "orange";
      break;

      case ServiceTypeEnum.api: serviceColor = "green";
      break;

      case ServiceTypeEnum.test: serviceColor = "blue";
      break;
    }
    console.log("%c%s", `color:${serviceColor}`, "[LOGGER]", message);
  }
}
