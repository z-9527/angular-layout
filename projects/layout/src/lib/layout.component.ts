import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { IMenu } from './side/side.component';

type UserInfo = {
  username?: string;
  avatar?: string;
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

  @Output() logout: EventEmitter<any> = new EventEmitter();

  isCollapsed: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  onLogout() {
    this.logout.emit();
  }
}
