import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'department-edit',
  template: `
  <h1>sdasjdsakj</h1>
    <form [formGroup]="form" (ngSubmit)="onFormSubmit()">
      <input type="hidden" formControlName="id">
      <div class="form-group">
        <label for="firstname">Название</label>
        <input type="text" class="form-control" id="firstname" placeholder="Firstname" formControlName="name">
      </div>
      <div class="form-group">
        <label for="surname">Контактна\ информация</label>
        <input type="text" class="form-control" id="surname" placeholder="Surname" formControlName="contactInfo">
      </div>
      <div class="form-group">
        <label for="surname">Руководитель</label>
        <input type="text" class="form-control" id="surname" placeholder="Surname" formControlName="manager">
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  `
})
export class DepartmentEditComponent implements OnInit {
  public form: FormGroup;

  @Input() data:any;
  @Output() save = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
        contactInfo: "",
        id : -1,
        manager: {},
        name: ""
    });
  }

  ngOnInit() {
    
    this.form.setValue({
        contactInfo: this.data.contactInfo||null,
        id : this.data.id||null,
        manager: this.data.manager||null,
        name: this.data.name||null
    });
  }

  onFormSubmit() {
    let dataModel = this.form.value;
    this.save.emit(dataModel);
  }
}
