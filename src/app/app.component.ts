import { Component, OnInit } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import data from './mock';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'layout-app';
  menus = [];

  constructor(private iconService: NzIconService) {
    // 导入icon font资源
    this.iconService.changeAssetsSource(
      'https://g.alicdn.com/onlineCourt/nz-icon/0.0.2'
    );
    this.iconService.fetchFromIconfont({
      scriptUrl: '//at.alicdn.com/t/font_713412_t6khjjhr8q.js',
    });
  }

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus = () => {
    this.menus = data;
    console.log('data: ', data);
  };
  logout() {
    console.log('logout: ');
  }
}
