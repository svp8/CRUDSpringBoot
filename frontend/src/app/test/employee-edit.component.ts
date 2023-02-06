import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'employee-edit',
  template: `
  <h1>Сотрудник</h1>
    <form [formGroup]="form" (ngSubmit)="onFormSubmit()">
      <input type="hidden" formControlName="id">
      <div class="form-group">
        <label for="firstname">Имя</label>
        <input type="text" class="form-control" id="firstname" placeholder="Firstname" formControlName="firstName">
      </div>
      <div class="form-group">
        <label for="surname">Фамилия</label>
        <input type="text" class="form-control" id="surname" placeholder="Surname" formControlName="surname">
      </div>
      <div class="form-group">
        <label for="surname">Отчество</label>
        <input type="text" class="form-control" id="surname" placeholder="Surname" formControlName="patronymic">
      </div>
      <div class="form-group">
        <label for="surname">Должность</label>
        <input type="text" class="form-control" id="surname" placeholder="Surname" formControlName="position">
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  `
})
export class EmployeeEditComponent implements OnInit {
  public form: FormGroup;

  @Input() data:any;
  @Output() save = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: "",
      id : "",
      surname: "",
      patronymic:"",
      position: ""
    });
  }

  ngOnInit() {
    console.log("sadsadasd")
    this.form.setValue({
        firstName: this.data.firstName||null,
        id : this.data.id||null,
        surname: this.data.surname||null,
        patronymic:this.data.patronymic||null,
        position: this.data.position||null
    });
  }

  onFormSubmit() {
    let dataModel = this.form.value;
    this.save.emit(dataModel);
  }
}
