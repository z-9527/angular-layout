import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

export interface IMenu {
  displayName: string; // '工单管理';
  resName: string; // 'caseList';
  resValue: string; // '/caseList';

  resIcon?: string; // nzType: 'smile'  nzIconfont: 'icon-smile';
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
export class SideComponent implements OnChanges {
  @Input() isCollapsed: boolean;
  @Input() menus: IMenu[] = [];
  @Output() toggleCollapsed: EventEmitter<any> = new EventEmitter();
  baseUrl = '';

  openKeys = [];

  constructor() {
    this.baseUrl = document
      .getElementsByTagName('base')[0]
      .getAttribute('href');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.menus) {
      // 刷新页面时打开当前路由菜单
      const pathname = location.pathname;
      const result = [];
      this.findKeyByPathname(this.menus, pathname, result);
      this.openKeys = result.slice();
    }
  }

  onToggle() {
    this.toggleCollapsed.emit();
  }

  findKeyByPathname = (arr, pathname, result) => {
    if (!Array.isArray(arr)) {
      return null;
    }
    for (let item of arr) {
      const url =
        this.baseUrl && this.baseUrl !== '/'
          ? `${this.baseUrl}${item.resValue}`
          : item.resValue;
      if (pathname === url) {
        item.childrenMenus && result.push(item.securityId);
        return item.securityId;
      }
      if (item.childrenMenus) {
        const i = this.findKeyByPathname(item.childrenMenus, pathname, result);
        if (i) {
          result.push(item.securityId);
          return i;
        }
      }
    }
    return null;
  };
}
