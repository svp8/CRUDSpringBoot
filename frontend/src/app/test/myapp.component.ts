import { Component, ViewChild } from '@angular/core';

import { TabsComponent } from './tabs.component';

import { order, employee, orgStructure } from "../../assets/headers.js"
import { createOrder, editOrder, getAllOrders, getOrdersByAuthorId, getOrdersByExecutorId } from 'src/assets/api/orderApi';
import { createEmployee, editEmployee, getAllEmployees } from 'src/assets/api/employee';
import { createDepartment, editDepartment, getAllDepartments } from 'src/assets/api/orgStructureApi';

@Component({
    selector: 'my-app',
    template: `
    <h1 style="padding: 10px;">Website</h1>
    <div class="main">
    <app-menu class="menu block"
    (onSelected)="onSelectedItem($event)"
    ></app-menu>
    <div class="windows block">
    <my-tabs>
    <!-- <my-tab [tabTitle]="'Главная страница'">
        <h3>Мои поручения</h3>

      </my-tab> -->
    </my-tabs>

    <ng-template let-data="data" #allOrders>
        <app-table
        [data]="data"
        (add)="onAdd()"
        (edit)="onEditOrder($event)"
        ></app-table>
    </ng-template>
    <ng-template let-data="data" #orgStructure>
        <app-table
        [data]="data"
        (add)="onAdd()"
        (edit)="onEditDepartment($event)"
        ></app-table>
    </ng-template>
    <ng-template let-data="data" #allEmployees>
        <app-table
        [data]="data"
        (add)="onAdd()"
        (edit)="onEditEmployee($event)"
        ></app-table>
    </ng-template>
    <ng-template let-data="data" #editOrder>
      <order-edit [person]="data" (saveOrder)="onFormSubmit($event,'ord')"></order-edit>
    </ng-template> 
    <ng-template let-data="data" #editDepartment>
      <department-edit [data]="data" (save)="onFormSubmit($event,'dep')"></department-edit>
    </ng-template> 
    <ng-template let-data="data" #editEmployee>
      <employee-edit [data]="data" (save)="onFormSubmit($event,'emp')"></employee-edit>
    </ng-template> 
</div>
     
  `,
    styleUrls: ['../app.component.scss']
})
export class MyAppComponent {
    @ViewChild('editEmployee') editEmployeeTemplate: any;
    @ViewChild('editDepartment') editDepartmentTemplate: any;
    @ViewChild('editOrder') editOrderTemplate: any;

    @ViewChild('allEmployees') allEmployeesTemplate: any;
    @ViewChild('orgStructure') orgStructureTemplate: any;
    @ViewChild('allOrders') allOrdersTemplate: any;


    @ViewChild('myOrders') myOrdersTemplate: any;
    @ViewChild('ordersToMe') ordersToMeTemplate: any;
    @ViewChild(TabsComponent) tabsComponent: any;



    onSelectedItem(item: any) {
        let data: any[];
        data = [];
        switch (item) {
            case "Все сотрудники":
                data[0] = employee;
                getAllEmployees().then(response => {
                    console.log(response.data)
                    data[1] = response.data;
                    this.tabsComponent.openTab(item, this.allEmployeesTemplate, data, true);
                }).catch(error => console.log(error))
                break;
            case "Структура организации":
                data[0] = orgStructure;
                getAllDepartments().then(response => {
                    console.log(response.data)
                    data[1] = response.data;
                    this.tabsComponent.openTab(item, this.orgStructureTemplate, data, true);
                }).catch(error => console.log(error))
                break;
            case "Все поручения":
                data[0] = order;
                getAllOrders().then(response => {
                    console.log(response.data)
                    data[1] = response.data;
                    data[1]=data[1].map((item: { [x: string]: string; })=>{
                        let date=new Date(item["date"])
                    item["date"]=date.toLocaleDateString('ru-RU')
                    return item;
                    })
                    this.tabsComponent.openTab(item, this.allOrdersTemplate, data, true);
                }).catch(error => console.log(error))
                break;
            case "Мои поручения":
                data[0] = order;
                getOrdersByAuthorId(1).then(response => {
                    console.log(response.data)
                    data[1] = response.data;
                    this.tabsComponent.openTab(item, this.allOrdersTemplate, data, true);
                }).catch(error => console.log(error))
                break;
            case "Поручения мне":
                data[0] = order;
                getOrdersByExecutorId(1).then(response => {
                    console.log(response.data)
                    data[1] = response.data;
                    this.tabsComponent.openTab(item, this.allOrdersTemplate, data, true);
                }).catch(error => console.log(error))
                break;
            default:
                break;
        }

    }
    onAdd() {
        this.tabsComponent.openTab('Новое поручение', this.editOrderTemplate, {}, true);
    }
    onEditOrder(order: any) {
        this.tabsComponent.openTab(
            `Editing ${order.title}`,
            this.editOrderTemplate,
            order,
            true
        );
    }
    onEditDepartment(order: any) {
        this.tabsComponent.openTab(
            `Editing ${order.name}`,
            this.editDepartmentTemplate,
            order,
            true
        );
    }
    onEditEmployee(order: any) {
        this.tabsComponent.openTab(
            `Editing ${order.surname}`,
            this.editEmployeeTemplate,
            order,
            true
        );
    }
    onFormSubmit(dataModel: any, type: string) {
        switch (type) {
            case "dep":
                if (dataModel["id"] != -1) {
                    editDepartment(dataModel).then(response => console.log(response)).catch()
                }
                else createDepartment(dataModel).then(response => console.log(response)).catch()
                this.tabsComponent.closeActiveTab();
                break;
            case "emp":
                if (dataModel["id"] != -1) {
                    editEmployee(dataModel).then(response => console.log(response)).catch()

                }
                else createEmployee(dataModel).then(response => console.log(response)).catch()
                this.tabsComponent.closeActiveTab();
                break;
            case "ord":
                if (dataModel["id"] != -1) {
                    editOrder(dataModel).then(response => console.log(response)).catch()
                }
                else createOrder(dataModel).then(response => console.log(response)).catch()
                this.tabsComponent.closeActiveTab();
                break;
            default:
                break;
        }
    }
}
