import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataSharingService {

  private messageSource = new BehaviorSubject<string>('default message');
  currentMessage = this.messageSource.asObservable();

  private codigosSource = new BehaviorSubject<string>('default codigos');
  currentCodigos = this.codigosSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  changeCodigos(codigos: string) {
    this.codigosSource.next(codigos);
  }

}
