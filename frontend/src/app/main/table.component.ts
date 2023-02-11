import { Component, EventEmitter, Input, Output } from '@angular/core';
import { searchByAttribute, searchByOrderAttribute } from 'src/assets/api/search';
@Component({
  selector: 'app-table',
  template: `
  <div class="bar" >
    <button (click)="add.emit()" class="btn btn-primary">Создать запись</button>
    <div class="search">
      <select [(ngModel)]="selectedAttribute" class="pad">
      <option  value="" disabled>Выберете атрибут</option>
        <option *ngFor="let attribute of headers" [ngValue]="attribute">{{attribute.name}}</option>
      </select>
      <input [(ngModel)]="query" type="text" class="input pad" type="text">
      <button (click)="search()" class="btn btn-search">Поиск по атрибуту</button>
    </div>
    <button class="btn btn-search" (click)="update()">Обновить</button>
  </div>
  <div class="bar">
    <button [disabled]="selectedItems.length==0" class="btn btn-update"(click)="editSelected()">Изменить</button>
    <button (click)="selectedItems=[]" class="btn btn-selected">Снять всё</button>
  </div>
  <table class="table table-striped">
      <thead class="header-container">
        <th  *ngFor="let header of headers">
          <div class="header"> 
            <span>{{header.name}}</span>
          <img (click)="sortOn(header)" class="header__img" [ngClass]="header.sorted?'header__img-up':'header__img'" src="../assets/sort.svg"/>
          </div>
        </th>
      </thead>
      <tbody *ngIf="headers[0].name=='Предмет‌ ‌поручения'">
        <tr *ngFor="let i of items" (dblclick)="edit.emit(i)" (click)="select(i)" [ngClass]="checkInSelected(i)?'selected':'notSelected'">
          <!-- <td *ngFor="let key of Object.keys(i)" >{{ i[key] }}</td> -->
          <td>{{i["title"]}}</td>
          <td>{{i["date"]}}</td>
          <td>{{i["controlTag"]}}</td>
          <td>{{i["executionTag"]}}</td>
          <td>{{i["text"]}}</td>
        </tr>
      </tbody>
      <tbody *ngIf="headers[0].name=='Наименование‌ ‌подразделения'">
        <tr *ngFor="let i of items" (dblclick)="edit.emit(i)" (click)="select(i)" [ngClass]="checkInSelected(i)?'selected':'notSelected'">
          <!-- <td *ngFor="let key of Object.keys(i)" >{{ i[key] }}</td> -->
          <td>{{i["name"]}}</td>
          <td>{{i["contactInfo"]}}</td>
          <td *ngIf="i['manager']!=null">{{i["manager"]["surname"]+" "+i["manager"]["firstName"]}}</td>
        </tr>
      </tbody>
      <tbody *ngIf="headers[0].name=='Фамилия'">
        <tr *ngFor="let i of items" (dblclick)="edit.emit(i)" (click)="select(i)" [ngClass]="checkInSelected(i)?'selected':'notSelected'">
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
  @Input() type: any;
  public headers: any;
  public items: Array<any> | undefined;
  public selectedAttribute: any = "";
  public query: string = "";
  public selectedItems:Array<any>=[];
  @Output() add = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  Object = Object;
  ngOnInit() {
    this.headers = this.data[0];
    // this.selectedAttribute=this.headers[0];
    this.items = this.data[1];
  
  }
  select(item:any){
  
    if(this.selectedItems.find(el=>el.id==item.id)){
      this.selectedItems=this.selectedItems.filter(el=>el.id!=item.id)
    }
    else this.selectedItems.push(item);
  }
  checkInSelected(item:any){
    if(this.selectedItems.length!=0){
      if(this.selectedItems.find(el=>el.id==item.id)){
        return true;
      }
    }
    return false;
  }
  editSelected(){
    this.selectedItems.map(item=>this.edit.emit(item));
  }

  sortOn(header: any) {
    let sortedData = this.items;
    if (header.sorted) {
      sortedData.sort((a, b) => {
        if (header.value == "date") {
          let d1 = new Date(a[header.value].split('.').reverse().join('/'));
          let d2 = new Date(b[header.value].split('.').reverse().join('/'));
          if (d1 < d2)
            return -1;
          if (d1 > d2)
            return 1;
          return 0;
        }
        if (header.value == "manager") {
          let d1 = a[header.value].surname+" "+a[header.value].firstName;
          let d2 = b[header.value].surname+" "+b[header.value].firstName;
          if (d1 < d2)
            return -1;
          if (d1 > d2)
            return 1;
          return 0;
        }
        if (a[header.value] < b[header.value])
          return -1;
        if (a[header.value] > b[header.value])
          return 1;
        return 0;
      })

    } else {
      
      sortedData.sort((a, b) => {
        if (header.value == "date") {
          let d1 = new Date(a[header.value].split('.').reverse().join('/'));
          let d2 = new Date(b[header.value].split('.').reverse().join('/'));
          if (d1 < d2)
            return -1;
          if (d1 > d2)
            return 1;
          return 0;
        }
        if (header.value == "manager") {
          let d1 = a[header.value].surname+" "+a[header.value].firstName;
          let d2 = b[header.value].surname+" "+b[header.value].firstName;
          if (d1 < d2)
            return -1;
          if (d1 > d2)
            return 1;
          return 0;
        }
        if (a[header.value] < b[header.value])
          return -1;
        if (a[header.value] > b[header.value])
          return 1;
        return 0;
      }).reverse();
    }
    this.headers = this.headers.map((head: { value: any; sorted: boolean; }) => {

      if (head.value == header.value) {
        head.sorted = !head.sorted;
      } else head.sorted = false;

      return head;
    })
  }
  update() {
    this.selectedItems=[];
    let user=JSON.parse(localStorage.getItem('user')) || '';
    this.data[2](user.id).then((response: { data: any; }) => {

      this.items = response.data
      if (this.items.length != 0) {
        if (this.items[0]['date'] != null)
          this.items = this.items.map((item: { [x: string]: string; }) => {
            let date = new Date(item["date"])
            item["date"] = date.toLocaleDateString('ru-RU')
            return item;
          })
      }
    })

  }
  search() {
    if (this.query != "" && this.selectedAttribute != "") {
      if (this.data.length != 4) {
        searchByAttribute(this.type, this.selectedAttribute.value, this.query).then(response => this.items = response.data)
      } else {
        searchByOrderAttribute(this.data[1], this.selectedAttribute.value, this.query).then(response => {
          this.items = response.data
          this.items = this.items.map((item: { [x: string]: string; }) => {
            let date = new Date(item["date"])
            item["date"] = date.toLocaleDateString('ru-RU')
            return item;
          })
        })
      }
    }
    else this.update()

  }

}
