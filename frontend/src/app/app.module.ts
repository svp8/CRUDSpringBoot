import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MyAppComponent } from './main/myapp.component';
import { MenuComponent } from './components/menu/menu.component';
import { TabsComponent } from './main/tabs.component';
import { TabComponent } from './main/tab.component';
import { DynamicTabsDirective } from './main/dynamic-tabs.directive';
import { OrderEditComponent } from './main/order-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './main/table.component';
import { DepartmentEditComponent } from './main/department-edit.component';
import { EmployeeEditComponent } from './main/employee-edit.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    MyAppComponent,
    MenuComponent,
    TabsComponent,
    TabComponent,
    TableComponent,
    DynamicTabsDirective,
    OrderEditComponent,
    DepartmentEditComponent,
    EmployeeEditComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule,FormsModule,NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TabComponent]
})
export class AppModule { }
