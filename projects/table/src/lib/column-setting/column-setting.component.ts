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
import { NzIconService } from 'ng-zorro-antd/icon';

const MAX_FIXED_NUM = 5;

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

  config = [
    {
      title: '固定在左侧',
      icon: 'vertical-align-top',
      key: 'fixedLeftList',
    },
    {
      title: '不固定',
      icon: 'vertical-align-middle',
      key: 'centerList',
    },
    {
      title: '固定在右侧',
      icon: 'vertical-align-bottom',
      key: 'fixedRightList',
    },
  ];

  constructor(private iconService: NzIconService) {
    this.iconService.fetchFromIconfont({
      scriptUrl: '//at.alicdn.com/t/font_2643049_q0k2oefv92.js',
    });
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if ('nzColumns' in changes) {
      this.handleColumns(changes.nzColumns.currentValue);
    }
  }

  getList(key) {
    return this[key];
  }

  getIconDisabled(key) {
    if (key === 'centerList') {
      return false;
    }
    return (
      this.fixedLeftList.length + this.fixedRightList.length >= MAX_FIXED_NUM
    );
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
    this.handleColumns(
      this.initColumns.map((item) => ({ ...item, show: true }))
    );
    this._changeColumns();
  }

  adjustPosition(index, from, to, item) {
    this[from].splice(index, 1);
    const numMap = {
      fixedLeftList: 0,
      centerList: 1,
      fixedRightList: 2,
    };
    const direction = numMap[to] - numMap[from] > 0 ? 'unshift' : 'push';
    this[to][direction](item);

    this._changeColumns();
  }
}
