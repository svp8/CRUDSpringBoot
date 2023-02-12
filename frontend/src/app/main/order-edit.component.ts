/**
 * Simple component to abstract the editing of a order
 * object.
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getAllEmployees } from 'src/assets/api/employee';
import { getFormErrors } from 'src/assets/getFormErrors';

@Component({
  selector: 'order-edit',
  template: `
  <h1>Поручение</h1>
    <form [formGroup]="orderForm" (ngSubmit)="onPersonFormSubmit()">
      <input type="hidden" formControlName="id">
      <div class="text-field">
        <label class="text-field__label" for="firstname">Предмет‌ ‌поручения*</label>
        <input type="text" class="text-field__input"  placeholder="Предмет поручения" formControlName="title">
      </div>
      <div class="text-field">
        <label class="text-field__label" for="surname">Автор‌ ‌поручения*</label>
        <select class="text-field__input" [formControl]="authorControl"  >
      <option value="" disabled >Выберете автора</option>
      <option *ngFor="let c of employees" [ngValue]="c">{{c.surname}}</option>
      </select>
      </div>
      <div class="text-field">
        <label class="text-field__label" for="surname">Срок‌ ‌исполнения*</label>
        <input type="text" class="text-field__input"  placeholder="ДД.ММ.ГГГГ" formControlName="date">
      </div>
      <div class="text-field">
        <label class="text-field__label" for="surname">Исполнители</label>
         <ng-select class="" formControlName="executors" [multiple]="true" placeholder="Выберете исполнителей">
          <ng-option  *ngFor="let c of employees" [value]="c.id">{{c.surname}}</ng-option>
        </ng-select>
        
      </div>
      <div class="text-field">
        <label class="text-field__label" for="surname">Признак‌ ‌контрольности</label>
        <input type="checkbox" class="text-field__checkbox" formControlName="controlTag">
      </div>
      <div class="text-field">
        <label class="text-field__label" for="surname">Признак‌ ‌исполнения</label>
        <input type="checkbox" class="text-field__checkbox"  formControlName="executionTag">
      </div>
      <div class="text-field">
        <label class="text-field__label" for="surname">Текст‌ ‌поручения</label>
        <textarea type="text" class="text-field__input"  placeholder="Текст" formControlName="text"></textarea>
      </div>
      <div>
      <button type="submit" class="btn btn-primary">Сохранить</button>
      <button *ngIf="order!=null" (click)="onDelete()" type="button" class="btn btn-delete">Удалить</button>
      </div>
    </form>
    
  `
})
export class OrderEditComponent implements OnInit {
  public orderForm: FormGroup;
  public selectedEmployee: any;
  public employees: any = [];
  @Input() order: any;
  @Output() saveOrder = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  selectedExecutors:Array<any>;


  authorControl = new FormControl("", [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]);
  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      "id": 0,
      "title": new FormControl("", [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      "executors": [],
      "date": new FormControl("", [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      "controlTag": "",
      "executionTag": null,
      "text": "",
      "author": this.authorControl
    });
  }

  ngOnInit() {

    getAllEmployees().then(response => {
      this.employees = response.data
      let author = 0;
      if (this.order != null) {
        this.employees.map((emp: { id: any; }, index: number) => {
          if (emp.id == this.order.author.id) {
            author = index
          }
          return index
        });
        let date = new Date(this.order["date"])
        this.order["date"] = date.toLocaleDateString('ru-RU')
        this.orderForm.setValue({
          "id": this.order.id || -1,
          "title": this.order.title || '',
          "executors": this.order.executors.map((e: { id: any; })=>e.id) || [],
          "date": this.order.date || "",
          "controlTag": this.order.controlTag || "",
          "executionTag": this.order.executionTag || null,
          "text": this.order.text || "",
          "author": this.employees[author] || null
        });
      }
      else {
        this.orderForm.setValue({
          "id": -1,
          "title": '',
          "executors": [],
          "date": "",
          "controlTag": false,
          "executionTag": false,
          "text": "",
          "author": ""
        });
      }

    })




  }

  onPersonFormSubmit() {
    let dataModel = this.orderForm.value;
    if (getFormErrors(this.orderForm) != null) {
      alert("Заполните все необходимые поля")
    }
    else this.saveOrder.emit(dataModel);
  }
  onDelete() {
    let flag = confirm("Вы правда хотите удалить запись?")
    if (flag) {
      this.delete.emit(this.order.id);
    }
  }
}
