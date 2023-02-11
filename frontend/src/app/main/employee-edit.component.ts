import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getFormErrors } from 'src/assets/getFormErrors';

@Component({
  selector: 'employee-edit',
  template: `
  <h1>Сотрудник</h1>
    <form [formGroup]="form" (ngSubmit)="onFormSubmit()">
      <input type="hidden" formControlName="id">
      <div class="text-field">
        <label class="text-field__label" for="firstname">Имя*</label>
        <input   type="text" class="text-field__input" id="firstname" placeholder="Firstname" formControlName="firstName">
      </div>
      <div class="text-field">
        <label class="text-field__label" for="surname">Фамилия*</label>
        <input type="text" class="text-field__input" id="surname" placeholder="Surname" formControlName="surname">
      </div>
      <div class="text-field">
        <label class="text-field__label" for="surname">Отчество</label>
        <input type="text" class="text-field__input" id="surname" placeholder="Surname" formControlName="patronymic">
      </div>
      <div class="text-field">
        <label class="text-field__label" for="surname">Должность</label>
        <input type="text" class="text-field__input" id="surname" placeholder="Surname" formControlName="position">
      </div>
      <div>
      <button type="submit" class="btn btn-primary">Сохранить</button>
      <button *ngIf="data!=null" (click)="onDelete()" type="button" class="btn btn-delete">Удалить</button>
      </div>
    </form>
  `
})
export class EmployeeEditComponent implements OnInit {
  public form: FormGroup;

  @Input() data: any;
  @Output() save = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: new FormControl("", Validators.required),
      id: -1,
      surname: new FormControl("", Validators.required),
      patronymic: "",
      position: ""
    });
  }

  ngOnInit() {
    if (this.data != null)
      this.form.setValue({
        firstName: this.data.firstName || null,
        id: this.data.id || null,
        surname: this.data.surname || null,
        patronymic: this.data.patronymic || null,
        position: this.data.position || null
      });
  }
  onDelete(){
    let flag=confirm("Вы правда хотите удалить запись?")
    if(flag){
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
