import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from 'layout';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NotFoundComponent } from './not-found/not-found.component';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
// eslint-disable-next-line no-unused-vars
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    // NzIconModule.forRoot(icons),
    NzIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
