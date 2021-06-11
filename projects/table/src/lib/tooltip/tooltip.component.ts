import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.less'],
})
export class TooltipComponent implements OnInit {
  @Output() toggleSize: EventEmitter<any> = new EventEmitter();
  fullscreen = false;
  constructor() {}

  ngOnInit(): void {}

  changeSize(size) {
    this.toggleSize.emit(size);
  }
}
