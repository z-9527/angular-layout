import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
const routes: Routes = [
  {
    path: 'table-demo',
    loadChildren: () =>
      import('./table-demo/table-demo.module').then((m) => m.TableDemoModule),
  },
  { path: '**', component: NotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
