import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-table',
    template: `
  <table class="table table-striped">
      <thead>
        <th *ngFor="let header of headers">{{header}}</th>
        <th></th>
      </thead>
      <tbody>
        <tr *ngFor="let i of items" (click)="edit.emit(i)">
          <td *ngFor="let value of Object.keys(i)">{{ value }}</td>
        </tr>
      </tbody>
  </table>
  `

})
export class TableComponent {
    @Input() data: any;
    public headers: any;
    public items: any;
    @Output() add = new EventEmitter<any>();
    @Output() edit = new EventEmitter<any>();
Object=Object;
    ngOnInit() {
        console.log(this.data);
        this.headers = this.data[0]
        this.items = this.data[1];
    }





}
