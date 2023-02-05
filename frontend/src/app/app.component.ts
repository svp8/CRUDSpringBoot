import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  public tabs=["Tab1","Tab2"];
  public selectedTab=0;

  onSelectedItem(item:any) {
    this.tabs.push(item);
  }
  onTabSelected(index:any){
    this.selectedTab=index;
  }
  onTabDeleted(index:any){
    this.tabs=this.tabs.filter((tab,id)=>index!=id);
  }
}
