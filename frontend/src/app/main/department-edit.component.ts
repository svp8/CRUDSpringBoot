import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getAllEmployees } from 'src/assets/api/employee';
import { getFormErrors } from 'src/assets/getFormErrors';

@Component({
  selector: 'department-edit',
  template: `
  <h1>Подразделение</h1>
    <form [formGroup]="form" style="max-width: 500px" (ngSubmit)="onFormSubmit()">
      <div class=" text-field text-field_floating">
        <label class="text-field__label" for="firstname">Название*</label>
        <input type="text" class="text-field__input" id="firstname" placeholder="Firstname" formControlName="name">
      </div>
      <div class="text-field text-field_floating">
        <label class="text-field__label" for="surname">Контактная информация</label>
        <input type="text" class="text-field__input"  placeholder="Surname" formControlName="contactInfo">
      </div>
      <div class="text-field">
        <label class="text-field__label" for="surname">Автор‌ ‌поручения*</label>
        <select class="text-field__input" formControlName="manager"  >
          <option value="" disabled >Выберете автора</option>
          <option *ngFor="let c of employees" [ngValue]="c">{{c.surname}}</option>
      </select>
      </div>
      <div>
      <button type="submit" class="btn btn-primary">Сохранить</button>
      <button *ngIf="data!=null" (click)="onDelete()" type="button" class="btn btn-delete">Удалить</button>
      </div>
    </form>
  `
})
export class DepartmentEditComponent implements OnInit {
  public form: FormGroup;

  @Input() data: any;
  @Output() save = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  employees: Array<any>

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      contactInfo: "",
      id: -1,
      manager: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    getAllEmployees().then(response => {
      this.employees = response.data
      let author = 0;
      if (this.data != null) {
        this.employees.map((emp: { id: any; }, index: number) => {
          if (emp.id == this.data.manager.id) {
            author = index
          }
          return index
        });
        this.form.setValue({
          contactInfo: this.data.contactInfo || null,
          id: this.data.id || null,
          manager: this.employees[author] || null,
          name: this.data.name || null
        });
      }
    })
  }
  onDelete() {
    let flag = confirm("Вы правда хотите удалить запись?")
    if (flag) {
      this.delete.emit(this.data.id);
    }
  }
  onFormSubmit() {
    let dataModel = this.form.value;
    if (getFormErrors(this.form) != null) {
      alert("Заполните все необходимые поля")
    }
    else this.save.emit(dataModel);
  }
}
