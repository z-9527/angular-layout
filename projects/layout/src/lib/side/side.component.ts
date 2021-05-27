import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface IMenu {
  displayName: string; // '工单管理';
  resName: string; // 'caseList';
  resValue: string; // '/caseList';

  resIcon?: string; // nzType: 'smile';
  childrenMenus?: IMenu[]; // [];
  parentId?: number; // 886;
  resType?: string; // 'MENU';
  sortId?: number; // 500;
}

@Component({
  selector: 'lib-layout-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.less'],
})
export class SideComponent implements OnInit {
  @Input() isCollapsed: boolean;
  @Input() menus?: IMenu[] = [];
  @Output() toggleCollapsed: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onToggle() {
    this.toggleCollapsed.emit();
  }
}
