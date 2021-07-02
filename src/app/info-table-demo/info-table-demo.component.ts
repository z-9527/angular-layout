import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as mock from './mock';
import { IField } from 'info-table';

@Component({
  selector: 'app-info-table-demo',
  templateUrl: './info-table-demo.component.html',
  styleUrls: ['./info-table-demo.component.less'],
})
export class InfoTableDemoComponent implements OnInit {
  @ViewChild('testRef') testRef: TemplateRef<any>;
  data = mock.data;
  config: IField[][] = mock.config;
  constructor() {}
  ngOnInit(): void {}

  onTest(...rest) {
    console.log('rest: ', rest);
  }
}
