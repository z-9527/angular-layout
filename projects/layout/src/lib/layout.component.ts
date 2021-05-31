import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { IMenu } from './side/side.component';

type UserInfo = {
  username?: string;
  avatar?: string;
};

type DropdownMenu = {
  text?: string | TemplateRef<any>;
  click?: () => {};
};

@Component({
  selector: 'lib-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit {
  @Input() logo?: string | TemplateRef<any>; //header左边的logo
  @Input() title?: string | TemplateRef<any>; //header左边的title
  @Input() userInfo?: UserInfo;
  @Input() menus?: IMenu[] = [];
  @Input() dropdownMenus?: DropdownMenu[] = [];

  isCollapsed: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
