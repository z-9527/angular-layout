import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormlyDemoRoutingModule } from './formly-demo-routing.module';
import { FormlyDemoComponent } from './formly-demo.component';

@NgModule({
  declarations: [FormlyDemoComponent],
  imports: [CommonModule, FormlyDemoRoutingModule],
})
export class FormlyDemoModule {}
