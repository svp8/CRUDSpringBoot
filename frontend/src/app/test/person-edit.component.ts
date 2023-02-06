/**
 * Simple component to abstract the editing of a person
 * object.
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'order-edit',
  template: `
  <h1>sdasjdsakj</h1>
    <form [formGroup]="personForm" (ngSubmit)="onPersonFormSubmit()">
      <input type="hidden" formControlName="id">
      <div class="form-group">
        <label for="firstname">предмет‌ ‌поручения</label>
        <input type="text" class="form-control" id="firstname" placeholder="Firstname" formControlName="title">
      </div>
      <div class="form-group">
        <label for="surname">автор‌ ‌поручения</label>
        <input type="text" class="form-control" id="surname" placeholder="Surname" formControlName="author">
      </div>
      <div class="form-group">
        <label for="surname">срок‌ ‌исполнения</label>
        <input type="text" class="form-control" id="surname" placeholder="Surname" formControlName="date">
      </div>
      <div class="form-group">
        <label for="surname">признак‌ ‌контрольности</label>
        <input type="text" class="form-control" id="surname" placeholder="Surname" formControlName="controlTag">
      </div>
      <div class="form-group">
        <label for="surname">признак‌ ‌исполнения</label>
        <input type="text" class="form-control" id="surname" placeholder="Surname" formControlName="executionTag">
      </div>
      <div class="form-group">
        <label for="surname">текст‌ ‌поручения</label>
        <input type="text" class="form-control" id="surname" placeholder="Surname" formControlName="text">
      </div>

      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  `
})
export class PersonEditComponent implements OnInit {
  public personForm: FormGroup;

  @Input() person:any;
  @Output() saveOrder = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    console.log("start");
    this.personForm = this.fb.group({
      "id":0,
      "title": "",
      "author": {},
      "executors": [],
      "date": "",
      "controlTag": "",
      "executionTag": null,
      "text": ""
    });
  }

  ngOnInit() {
    
    this.personForm.setValue({
      "id":this.person.id|| -1,
      "title": this.person.title ||'',
      "author": this.person.author||{},
      "executors":this.person.executors ||[],
      "date": this.person.date||"",
      "controlTag":this.person.controlTag|| "",
      "executionTag": this.person.executionTag || null,
      "text": this.person.text||""
    });
    console.log("stop")
  }

  onPersonFormSubmit() {
    let dataModel = this.personForm.value;
    this.saveOrder.emit(dataModel);
  }
}
