import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MyAppComponent } from './test/myapp.component';
import { MenuComponent } from './components/menu/menu.component';
import { TabsComponent } from './test/tabs.component';
import { TabComponent } from './test/tab.component';
import { DynamicTabsDirective } from './test/dynamic-tabs.directive';
import { PersonEditComponent } from './test/person-edit.component';
import { PeopleListComponent } from './test/people-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './test/table.component';
import { DepartmentEditComponent } from './test/department-edit.component';
import { EmployeeEditComponent } from './test/employee-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MyAppComponent,
    MenuComponent,
    TabsComponent,
    TabComponent,
    TableComponent,
    DynamicTabsDirective,
    PersonEditComponent,
    PeopleListComponent,
    DepartmentEditComponent,
    EmployeeEditComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TabComponent]
})
export class AppModule { }
