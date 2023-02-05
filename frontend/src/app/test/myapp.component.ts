import { Component, ViewChild } from '@angular/core';

import { TabsComponent } from './tabs.component';

import {order,employee,orgStructure} from "../../assets/headers.js"

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

    <ng-template let-data="data" #allEmployees>
        <app-table
        [data]="data"
        ></app-table>
    </ng-template>
    <ng-template let-data="data" #allOrders>
        <app-table
        [data]="data"
        (add)="onAdd()"
        (edit)="onEditOrder($event)"
        ></app-table>
    </ng-template>
    <ng-template let-data="data" #editOrder>
      <person-edit [person]="data" (saveOrder)="onPersonFormSubmit($event)"></person-edit>
    </ng-template> 
</div>
     
  `,
    styleUrls: ['../app.component.scss']
})
export class MyAppComponent {
    @ViewChild('personEdit') editPersonTemplate: any;
    @ViewChild('about') aboutTemplate: any;
    @ViewChild('allEmployees') allEmployeesTemplate: any;
    @ViewChild('OrgStruction') orgStructureTemplate: any;
    @ViewChild('allOrders') allOrdersTemplate: any;
    @ViewChild('editOrder') editOrderTemplate: any;
    @ViewChild('myOrders') myOrdersTemplate: any;
    @ViewChild('ordersToMe') ordersToMeTemplate: any;
    @ViewChild(TabsComponent) tabsComponent: any;

    orders=[];

    onSelectedItem(item: any) {
        let data = [];
        switch (item) {
            case "Все сотрудники":
                data[0] = employee;
                data[1] = [{ id: 1, name: "Bro", secondName: "brovich" }, { id: 2, name: "Brug", secondName: "brovich" }];
                this.tabsComponent.openTab(item, this.allEmployeesTemplate, data, true);
                break;
            case "Структура организации":
                data[0] = orgStructure;
                data[1] = [{ id: 1, name: "Bro", secondName: "brovich" }, { id: 2, name: "Brug", secondName: "brovich" }];
                this.tabsComponent.openTab(item, this.allOrdersTemplate, data, true);
                break;
            case "Все поручения":
                data[0] =order;
                data[1] = [{ id: 1, name: "Bro", secondName: "brovich" }, { id: 2, name: "Brug", secondName: "brovich" }];
                this.tabsComponent.openTab(item, this.allOrdersTemplate, data, true);
                break;
            case "Мои поручения":
                data[0] = order;
                data[1] = [{ id: 1, name: "Bro", secondName: "brovich" }, { id: 2, name: "Brug", secondName: "brovich" }];
                this.tabsComponent.openTab(item, this.allOrdersTemplate, data, true);
                break;
            case "Поручения мне":
                data[0] = order;
                data[1] = [{ id: 1, name: "Bro", secondName: "brovich" }, { id: 2, name: "Brug", secondName: "brovich" }];
                this.tabsComponent.openTab(item, this.allOrdersTemplate, data, true);
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
            `Editing ${order.id}`,
            this.editOrderTemplate,
            order,
            true
        );
    }
    onPersonFormSubmit(dataModel: any) {
        if (dataModel.id > 0) {
            // this.people = this.people.map(person => {
            //     if (person.id === dataModel.id) {
            //         return dataModel;
            //     } else {
            //         return person;
            //     }
            // });
        } else {
            // create a new one
            dataModel.id = Math.round(Math.random() * 100);
            // this.people.push(dataModel);
        }

        // close the tab
        this.tabsComponent.closeActiveTab();
    }

    onOpenAbout() {
        this.tabsComponent.openTab('About', this.aboutTemplate, {}, true);
    }
}
