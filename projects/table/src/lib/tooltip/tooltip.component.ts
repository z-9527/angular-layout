import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.less'],
})
export class TooltipComponent implements OnInit {
  @Output() changeSize: EventEmitter<any> = new EventEmitter();
  @Output() toggleFullScreen: EventEmitter<any> = new EventEmitter();
  fullscreen = false;
  constructor() {}

  ngOnInit(): void {}

  _changeSize(size) {
    this.changeSize.emit(size);
  }
  _toggleFullScreen() {
    this.fullscreen = !this.fullscreen;
    this.toggleFullScreen.emit(this.fullscreen);
  }
}
