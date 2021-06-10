import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { INzColumn, StringTemplateRef } from '../interface';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class TableComponent implements OnInit {
  @Input() nzColumns: INzColumn[] = [];
  @Input() nzData?: Record<string, any>[];
  @Input() nzTemplateRefs?: Record<string, TemplateRef<any>>;
  @Input() nzScroll?: { x?: string; y?: string };
  @Input() nzBordered?: boolean;
  @Input() nzOuterBordered?: boolean;
  @Input() nzTitle?: StringTemplateRef;
  @Input() nzFooter?: StringTemplateRef;
  @Input() nzNoResult?: StringTemplateRef;
  constructor() {}

  ngOnInit(): void {}
}
