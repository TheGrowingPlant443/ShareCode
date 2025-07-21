import { Component, Input, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { FormFieldModule } from '@kirbydesign/designsystem';
import { JsonPipe } from '@angular/common';

const config = {
  selector: 'cookbook-dropdown-example-ng-forms',
  template: `<kirby-form-field label="Error" [formGroup]="form"  message="This is an error message">
  <kirby-dropdown
    formControlName="favoriteFood"
    [size]="size"
    placeholder="Dropdown in form"
    [items]="items"
    itemTextProperty="title"
    [hasError]="form.disabled ? false : !form.valid"
  ></kirby-dropdown>
</kirby-form-field>
<fieldset>
  <legend>Configuration</legend>
  <kirby-checkbox
    [checked]="canSelectFavorite"
    (checkedChange)="toggleEnabled($event)"
    text="Form field enabled"
    size="xs">
  </kirby-checkbox>
  <kirby-checkbox
    [checked]="favoriteRequired"
    (checkedChange)="toggleRequired($event)"
    text="Form field required"
    size="xs">
  </kirby-checkbox>
  <p class="selection">
    form.value: {{ form.value | json }}<br />
    form.favoriteFood:
      <span [class.state-true]="favoriteFoodControl.valid">valid: {{ favoriteFoodControl.valid }}</span>
      <span [class.state-true]="favoriteFoodControl.enabled">enabled: {{ favoriteFoodControl.enabled }}</span>
      <span [class.state-true]="favoriteFoodControl.touched">touched: {{ favoriteFoodControl.touched }}</span>
  </p>
</fieldset>`,
  codeSnippet: `form = new FormGroup({
  favoriteFood: new FormControl({ value: this.items[2], disabled: !this.canSelectFavorite }),
});

toggleEnabled(enabled: boolean) {
  const favoriteFoodControl = this.form.controls['favoriteFood'];
  enabled
    ? favoriteFoodControl.enable()
    : favoriteFoodControl.disable();
}

toggleRequired(required: boolean) {
  const favoriteFoodControl = this.form.controls['favoriteFood'];
  required
    ? favoriteFoodControl.setValidators(Validators.required)
    : favoriteFoodControl.setValidators(null);
  favoriteFoodControl.updateValueAndValidity();
}`,
  styles: [
    `.selection {
      margin: 0;
      font-size: 12px;
      line-height: 16px;
      font-style: italic;
    }`,
    `span {
      background-color: #ff595e;
      margin-right: 4px;
      padding: 0px 2px;
      border-radius: 4px;
    }`,
    `span.state-true {
      background-color: #2cf287;
    }`,
  ],
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,
  imports: [
    FormsModule,
    FormFieldModule,
    ReactiveFormsModule,
    DropdownModule,
    CheckboxComponent,
    JsonPipe,
  ],
})
export class DropdownExampleNgFormsComponent implements OnInit {
  template: string = config.template.split('<fieldset>')[0]; // Remove config part of the template
  codeSnippet: string = config.codeSnippet;
  canSelectFavorite = true;
  favoriteRequired = true;
  items = [
    { title: 'Bacon', subtitle: 'Bacon ipsum dolor', value: 1 },
    { title: 'Salami', subtitle: 'Salami andouille hamburger', value: 2 },
    { title: 'Tenderloin', subtitle: 'Tenderloin short loin frankfurter', value: 3 },
    { title: 'Tongue', subtitle: 'Tongue bresaola tail swine', value: 4 },
    { title: 'Drumstick', subtitle: 'Drumstick pastrami sirloin ', value: 5 },
  ];
  form: UntypedFormGroup;
  favoriteFoodControl: UntypedFormControl;
  @Input() size: string;

  ngOnInit(): void {
    this.buildForm();
  }

  toggleEnabled(enabled: boolean) {
    this.canSelectFavorite = enabled;
    enabled
      ? this.favoriteFoodControl.enable()
      : this.favoriteFoodControl.disable({ onlySelf: true, emitEvent: false });
    this.favoriteFoodControl.setValidators(Validators.nullValidator);
    this.favoriteFoodControl.updateValueAndValidity();
  }

  toggleRequired(required: boolean) {
    this.favoriteRequired = required;
    required
      ? this.favoriteFoodControl.setValidators(Validators.required)
      : this.favoriteFoodControl.setValidators(null);
    this.favoriteFoodControl.updateValueAndValidity();
  }

  private buildForm() {
    this.favoriteFoodControl = new UntypedFormControl(
      null,
      this.favoriteRequired ? Validators.required : null
    );
    if (!this.canSelectFavorite) {
      this.favoriteFoodControl.disable();
    }
    this.form = new UntypedFormGroup({
      favoriteFood: this.favoriteFoodControl,
    });
  }

  get favFoodControl() {
    return this.form.controls['favoriteFood'];
  }
}
