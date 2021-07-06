import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
// eslint-disable-next-line no-unused-vars
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-demo',
  templateUrl: './formly-demo.component.html',
  styleUrls: ['./formly-demo.component.less'],
})
export class FormlyDemoComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  // options: FormlyFormOptions = {
  //   formState: {
  //     // cols: 8,
  //     vertical: true,
  //   },
  // };
  fields: FormlyFieldConfig[] = [];

  constructor() {}

  ngOnInit(): void {
    this.fields = [
      {
        key: 'firstName',
        type: 'input',
        templateOptions: {
          label: 'firstName',
          required: true,
          itemClassName: 'ttttt',
          tooltipTitle: '提示信息提示',
          afterRef: 'btnRef',
          // labelCol: 4,
          // cols: 12,
        },
      },
      {
        key: 'firstName2',
        type: 'input',
        templateOptions: {
          label: 'firstName2',
        },
      },
      {
        key: 'firstName3',
        type: 'input',
        templateOptions: {
          label: 'firstName3',
        },
      },
      {
        key: 'firstName4',
        type: 'input',
        templateOptions: {
          label: 'firstName3',
        },
      },
    ];
  }
  submit() {
    if (this.form.valid) {
      console.log(JSON.stringify(this.model));
    }
  }
}
