import { Component, Input } from '@angular/core';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';

const config = {
  selector: 'cookbook-dropdown-example-default',
  template: `<kirby-dropdown
  [size]="size"
  placeholder="Dropdown with plain text"
  [items]="['Item 1','Item 2','Item 3','Item 4','Item 5']"
  [hasError]="true"
  errorMessage="Hello world"
></kirby-dropdown>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [DropdownModule],
})
export class DropdownExampleDefaultComponent {
  template: string = config.template;
  @Input() size: string;
}
