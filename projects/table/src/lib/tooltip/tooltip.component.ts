import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INzColumn } from '../../interface';

@Component({
  selector: 'lib-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.less'],
})
export class TooltipComponent implements OnInit {
  @Input() nzColumns: INzColumn[] = [];
  @Input() initColumns: INzColumn[] = [];
  @Output() changeSize: EventEmitter<any> = new EventEmitter();
  @Output() toggleFullScreen: EventEmitter<any> = new EventEmitter();
  @Output() refresh: EventEmitter<any> = new EventEmitter();
  @Output() changeColumns: EventEmitter<INzColumn[]> = new EventEmitter();
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
  _refresh() {
    this.refresh.emit();
  }
  _changeColumns(arr) {
    this.changeColumns.emit(arr);
  }
}
