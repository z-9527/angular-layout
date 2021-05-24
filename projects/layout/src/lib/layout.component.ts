import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit {
  isCollapsed: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
