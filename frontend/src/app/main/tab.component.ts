/**
 * A single tab page. It renders the passed template
 * via the @Input properties by using the ngTemplateOutlet
 * and ngTemplateOutletContext directives.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-tab',
  styles: [
    `
    .pane{
      padding: 1em;
      border:1px solid gray;
      border-top:0;
      background-color:white;
    }
  `
  ],
  template: `
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
      <ng-container *ngIf="template"
        [ngTemplateOutlet]="template"
        [ngTemplateOutletContext]="{ data: dataContext }"
      >
      </ng-container>
    </div>
  `
})
export class TabComponent {
  @Input('tabTitle')
  title!: string;
  @Input() active = false;
  @Input() isCloseable = false;
  @Input() template:any;
  @Input() dataContext:any;
}
