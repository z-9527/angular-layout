import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormlyDemoComponent } from './formly-demo.component';

const routes: Routes = [{ path: '', component: FormlyDemoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormlyDemoRoutingModule {}
