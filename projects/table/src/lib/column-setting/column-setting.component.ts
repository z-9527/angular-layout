import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { INzColumn } from '../../interface';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'lib-column-setting',
  templateUrl: './column-setting.component.html',
  styleUrls: ['./column-setting.component.less'],
})
export class ColumnSettingComponent implements OnInit, OnChanges {
  @Input() nzColumns: INzColumn[] = [];
  @Input() initColumns: INzColumn[] = [];
  @Output() changeColumns: EventEmitter<INzColumn[]> = new EventEmitter();

  fixedLeftList: INzColumn[] = [];
  centerList: INzColumn[] = [];
  fixedRightList: INzColumn[] = [];
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if ('nzColumns' in changes) {
      this.handleColumns(changes.nzColumns.currentValue);
    }
  }

  handleColumns(arr: INzColumn[]) {
    let fixedLeftList = [];
    let centerList = [];
    let fixedRightList = [];
    if (Array.isArray(arr)) {
      arr.forEach((item) => {
        if (item.fixed === 'left') {
          fixedLeftList.push(item);
        } else if (item.fixed === 'right') {
          fixedRightList.push(item);
        } else {
          centerList.push(item);
        }
      });
    }
    this.fixedLeftList = fixedLeftList;
    this.centerList = centerList;
    this.fixedRightList = fixedRightList;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this._changeColumns();
  }

  getColumnsResult() {
    const fixedLeftList = this.fixedLeftList.map((item) => ({
      ...item,
      fixed: 'left',
    }));
    const centerList = this.centerList.map((item) => ({
      ...item,
      fixed: undefined,
    }));
    const fixedRightList = this.fixedRightList.map((item) => ({
      ...item,
      fixed: 'right',
    }));

    const list = [...fixedLeftList, ...centerList, ...fixedRightList];
    return list;
  }

  _changeColumns() {
    const result = this.getColumnsResult();
    this.changeColumns.emit(result);
  }

  onReset() {
    this.handleColumns(this.initColumns);
    this._changeColumns();
  }
}
