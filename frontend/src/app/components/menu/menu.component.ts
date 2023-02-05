import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public orgs;
  public orders;
  @Output() onSelected = new EventEmitter<any>();
  constructor() {
    this.orgs = {name:"Справочник организации",visible:false, chItems:[{name:"Организация 1",visible:false,items:["Структура организации","Все сотрудники"]}]};
     this.orders={name:"Поручения",visible:true,chItems:["Все поручения","Мои поручения","Поручения мне"]}
  }

  public open(event:Event, item:any) {
    alert('Open ' + item);
  }
  public onSelectedItem(item:any){
    this.onSelected.emit(item);
  }
}
