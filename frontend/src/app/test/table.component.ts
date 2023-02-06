import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../models/employee';
@Component({
  selector: 'app-table',
  template: `
  <table class="table table-striped">
      <thead>
        <th *ngFor="let header of headers">{{header}}</th>
        <th></th>
      </thead>
      <tbody *ngIf="headers[0]=='предмет‌ ‌поручения'">
        <tr *ngFor="let i of items" (click)="edit.emit(i)">
          <!-- <td *ngFor="let key of Object.keys(i)" >{{ i[key] }}</td> -->
          <td>{{i["title"]}}</td>
          <td>{{i["date"]}}</td>
          <td>{{i["controlTag"]}}</td>
          <td>{{i["executionTag"]}}</td>
          <td>{{i["text"]}}</td>
        </tr>
      </tbody>
      <tbody *ngIf="headers[0]=='Наименование‌ ‌подразделения'">
        <tr *ngFor="let i of items" (click)="edit.emit(i)">
          <!-- <td *ngFor="let key of Object.keys(i)" >{{ i[key] }}</td> -->
          <td>{{i["name"]}}</td>
          <td>{{i["contactInfo"]}}</td>
          <td>{{i["manager"]["surname"]+" "+i["manager"]["firstName"][0]+"."}}</td>
        </tr>
      </tbody>
      <tbody *ngIf="headers[0]=='Фамилия'">
        <tr *ngFor="let i of items" (click)="edit.emit(i)">
          <td>{{i["surname"]}}</td>
          <td>{{i["firstName"]}}</td>
          <td>{{i["patronymic"]}}</td>
          <td>{{i["position"]}}</td>
        </tr>
      </tbody>
  </table>
  `

})
export class TableComponent {
  @Input() data: any;
  public headers: any;
  public items: [] | undefined;
  @Output() add = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  Object = Object;
  ngOnInit() {
    this.headers = this.data[0];

    this.items = this.data[1];
    console.log(this.items);
  }





}
