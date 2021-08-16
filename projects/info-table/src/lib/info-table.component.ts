import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { IField, StringTemplateRef } from '../interface';
import * as dayjs from 'dayjs';
@Component({
  selector: 'lib-info-table',
  templateUrl: './info-table.component.html',
  styleUrls: ['./info-table.component.less'],
})
export class InfoTableComponent implements OnInit {
  @Input() nzTitle?: StringTemplateRef;
  @Input() nzData?: Record<string, any> = {};
  @Input() nzConfig?: IField[][] = [];
  @Input() nzLabelWidth?: string;
  @Input() nzTemplateRefs?: Record<string, TemplateRef<any>> = {};
  constructor() {}

  ngOnInit(): void {}

  isArray(arr) {
    return Array.isArray(arr);
  }

  getText(data, item) {
    const text = item.format ? item.format(data, item.key) : data[item.key];
    if (item.type === 'date') {
      return text && dayjs(text).format('YYYY-MM-DD HH:mm:ss');
    }
    return text;
  }
  getLink(data, item) {
    if (typeof item.link === 'function') {
      return item.link(data, item.key);
    }
    return data[item.key];
  }
}
