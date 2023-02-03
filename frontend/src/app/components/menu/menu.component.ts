import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public orgs;
  public orders;

  constructor() {
    this.orgs = {name:"Справочник организации",visible:false, chItems:[{name:"Организация 1",visible:false,items:[{name:"Структура организации"},{name:"Все сотрудники"}]}]};
     this.orders={name:"Поручения",visible:true,chItems:["Все поручения","Мои поручения","Поручения мне"]}
  }

  public open(event:Event, item:any) {
    alert('Open ' + item);
  }
}
