import { Component, OnInit, ViewChild } from '@angular/core';

import { TabsComponent } from './tabs.component';

import { order, employee, orgStructure } from "../../assets/headers.js"
import { createOrder, deleteOrder, editOrder, getAllOrders, getOrderById, getOrdersByAuthorId, getOrdersByExecutorId } from 'src/assets/api/orderApi';
import { createEmployee, deleteEmployee, editEmployee, getAllEmployees, getEmployeeById } from 'src/assets/api/employee';
import { createDepartment, deleteDepartment, editDepartment, getAllDepartments, getDepartmentById } from 'src/assets/api/orgStructureApi';

@Component({
    selector: 'my-app',
    template: `
    <header style="padding: 10px;" class="header">
       <h1 >Website</h1> 
       <div>
        <span>Пользователь: </span>
        <select (change)="updateUser()" (focus)="onUserSelect()" class="" [(ngModel)]="selectedEmployee"  >
            <option value="" disabled >Выберете пользователя</option>
            <option *ngFor="let c of employees" [ngValue]="c">{{c.surname}}</option>
      </select>
       </div>
</header>
    <div class="main">
    <app-menu class="menu block"
    (onSelected)="onSelectedItem($event)"
    ></app-menu>
    <div class="windows block">
    <my-tabs class="windows">
    </my-tabs>

    <ng-template let-data="data" #allOrders>
        <app-table
        [data]="data"
        type="Order"
        (add)="onAdd('ord')"
        (edit)="onEditOrder($event)"
        ></app-table>
    </ng-template>
    <ng-template let-data="data" #orgStructure>
        <app-table
        [data]="data"
        type="Department"
        (add)="onAdd('dep')"
        (edit)="onEditDepartment($event)"
        ></app-table>
    </ng-template>
    <ng-template let-data="data" #allEmployees>
        <app-table
        [data]="data"
        type="Employee"
        (add)="onAdd('emp')"
        (edit)="onEditEmployee($event)"
        ></app-table>
    </ng-template>
    <ng-template let-data="data" #editOrder>
      <order-edit [order]="data" (saveOrder)="onFormSubmit($event,'ord')" (delete)="onDelete($event,'ord')"></order-edit>
    </ng-template> 
    <ng-template let-data="data" #editDepartment>
      <department-edit [data]="data" (save)="onFormSubmit($event,'dep')" (delete)="onDelete($event,'dep')"></department-edit>
    </ng-template> 
    <ng-template let-data="data" #editEmployee>
      <employee-edit [data]="data" (save)="onFormSubmit($event,'emp')" (delete)="onDelete($event,'emp')"></employee-edit>
    </ng-template> 
</div>
     
  `,
    styleUrls: ['../app.component.scss']
})
export class MyAppComponent implements OnInit {
    @ViewChild('editEmployee') editEmployeeTemplate: any;
    @ViewChild('editDepartment') editDepartmentTemplate: any;
    @ViewChild('editOrder') editOrderTemplate: any;

    @ViewChild('allEmployees') allEmployeesTemplate: any;
    @ViewChild('orgStructure') orgStructureTemplate: any;
    @ViewChild('allOrders') allOrdersTemplate: any;


    @ViewChild('myOrders') myOrdersTemplate: any;
    @ViewChild('ordersToMe') ordersToMeTemplate: any;
    @ViewChild(TabsComponent) tabsComponent: any;
    employees: Array<any>;
    selectedEmployee: any;

    ngOnInit() {
        if (JSON.parse(localStorage.getItem('user')) != null) {
            this.selectedEmployee = JSON.parse(localStorage.getItem('user')) || '';
        let user = 0;
        this.onUserSelect().then(i => {
            this.employees.map((emp: { id: any; }, index: number) => {
                if (emp.id == this.selectedEmployee.id) {
                    user = index
                }
                return index
            });
            this.selectedEmployee = this.employees[user]
        })
        
        }
        

    }
    updateUser() {
   
        localStorage.setItem('user', JSON.stringify(this.selectedEmployee));
    }
    onUserSelect() {

        return getAllEmployees().then(response => {
            this.employees = response.data
        })
    }

    onSelectedItem(item: any) {
        let data: any[];
        data = [];
        switch (item) {
            case "Все сотрудники":
                data[0] = employee;
                getAllEmployees().then(response => {
            
                    data[1] = response.data;
                    data[2] = getAllEmployees;
                    this.tabsComponent.openTab(item, this.allEmployeesTemplate, data, true);
                }).catch(error => console.log(error))
                break;
            case "Структура организации":
                data[0] = orgStructure;
                getAllDepartments().then(response => {
                   
                    data[1] = response.data;
                    data[2] = getAllDepartments
                    this.tabsComponent.openTab(item, this.orgStructureTemplate, data, true);
                }).catch(error => console.log(error))
                break;
            case "Все поручения":
                data[0] = order;
                getAllOrders().then(response => {
                    
                    data[1] = response.data;
                    data[1] = data[1].map((item: { [x: string]: string; }) => {
                        let date = new Date(item["date"])
                        item["date"] = date.toLocaleDateString('ru-RU')
                        return item;
                    })
                    data[2] = getAllOrders;
                    data[3] = "all";
                    this.tabsComponent.openTab(item, this.allOrdersTemplate, data, true);
                }).catch(error => console.log(error))
                break;
            case "Мои поручения":
                data[0] = order;
                if (this.selectedEmployee != null) {
                    getOrdersByAuthorId(this.selectedEmployee.id).then(response => {
                       
                        data[1] = response.data;
                        data[1] = data[1].map((item: { [x: string]: string; }) => {
                            let date = new Date(item["date"])
                            item["date"] = date.toLocaleDateString('ru-RU')
                            return item;
                        })
                        data[2] = getOrdersByAuthorId
                        data[3] = "my";
                        this.tabsComponent.openTab(item, this.allOrdersTemplate, data, true);
                    }).catch(error => console.log(error))
                }
                else alert("Выберете пользователя")

                break;
            case "Поручения мне":
                data[0] = order;
                if (this.selectedEmployee != null) {
                    getOrdersByExecutorId(this.selectedEmployee.id).then(response => {
                       
                        data[1] = response.data;
                        data[1] = data[1].map((item: { [x: string]: string; }) => {
                            let date = new Date(item["date"])
                            item["date"] = date.toLocaleDateString('ru-RU')
                            return item;
                        })
                        data[2] = getOrdersByExecutorId;
                        data[3] = "toMe";
                        this.tabsComponent.openTab(item, this.allOrdersTemplate, data, true);
                    }).catch(error => console.log(error))
                }
                else alert("Выберете пользователя")
                break;
            default:
                break;
        }

    }
    onAdd(type: string) {
        switch (type) {
            case "ord":
                this.tabsComponent.openTab('Новое поручение', this.editOrderTemplate, null, true);
                break;
            case "emp":
                this.tabsComponent.openTab('Новый сотрудник', this.editEmployeeTemplate, null, true);
                break;
            case "dep":
                this.tabsComponent.openTab('Новое подразделение', this.editDepartmentTemplate, null, true);
                break;
            default:
                break;
        }

    }
    onEditOrder(order: any) {
        getOrderById(order.id).then(response => this.tabsComponent.openTab(
            `Editing ${order.title}`,
            this.editOrderTemplate,
            response.data,
            true
        ))

    }
    onEditDepartment(dep: any) {
        getDepartmentById(dep.id).then(response => this.tabsComponent.openTab(
            `Editing ${dep.name}`,
            this.editDepartmentTemplate,
            response.data,
            true)
        );

    }
    onEditEmployee(emp: any) {
        getEmployeeById(emp.id).then(response => this.tabsComponent.openTab(
            `Editing ${emp.surname}`,
            this.editEmployeeTemplate,
            response.data,
            true
        ))
            ;
    }
    onFormSubmit(dataModel: any, type: string) {
        switch (type) {
            case "dep":
                if (dataModel["id"] != -1) {
                    editDepartment(dataModel).then(response => {
                        this.tabsComponent.closeActiveTab();
                    }).catch()
                }
                else createDepartment(dataModel).then(response => this.tabsComponent.closeActiveTab()).catch()

                break;
            case "emp":
                if (dataModel["id"] != -1) {
                    editEmployee(dataModel).then(response => this.tabsComponent.closeActiveTab()).catch()

                }
                else createEmployee(dataModel).then(response => this.tabsComponent.closeActiveTab()).catch()
                break;
            case "ord":
                if (dataModel["id"] != -1) {
                    editOrder(dataModel).then(response => this.tabsComponent.closeActiveTab()).catch(err => alert(err.response.data))
                }
                else createOrder(dataModel).then(response => this.tabsComponent.closeActiveTab()).catch()
                break;
            default:
                break;
        }
    }
    onDelete(dataModel: number, type: string) {
        switch (type) {
            case "dep":
                deleteDepartment(dataModel).then(resp=>this.tabsComponent.closeActiveTab()).catch(err=>alert("Не удалось удалить, попробуйте убрать упоминания записи в других представлениях"))
                
                break;
            case "emp":
                deleteEmployee(dataModel).then(resp=>this.tabsComponent.closeActiveTab()).catch(err=>alert("Не удалось удалить, попробуйте убрать упоминания записи в других представлениях"))
                
                break;
            case "ord":
                deleteOrder(dataModel).then(this.tabsComponent.closeActiveTab()).catch(err=>alert("Не удалось удалить, попробуйте убрать упоминания записи в других представлениях"))
                
                break;
            default:
                break;
        }
    }
}
