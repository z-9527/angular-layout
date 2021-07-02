import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-ellipsis-text',
  templateUrl: './ellipsis-text.component.html',
  styleUrls: ['./ellipsis-text.component.less'],
})
export class EllipsisTextComponent implements OnInit {
  isFold = true;
  constructor() {}

  ngOnInit(): void {}
  toggleFold() {
    this.isFold = !this.isFold;
  }
}
