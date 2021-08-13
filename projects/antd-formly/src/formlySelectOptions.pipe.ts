import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * ['string'] => [{label:'string',value:'string'}]
 * 非Array => []
 */

interface ISelectOption {
  label: string;
  disabled?: boolean;
  value?: any;
  children?: ISelectOption[];
}

@Pipe({ name: 'formlySelectOptions' })
export class FormlySelectOptionsPipe implements PipeTransform {
  transform(options: any): Observable<ISelectOption[]> {
    if (!(options instanceof Observable)) {
      options = observableOf(options);
    }

    return (options as Observable<any>).pipe(map((value) => this.transformOptions(value)));
  }

  private transformOptions(options: any[]): ISelectOption[] {
    if (!Array.isArray(options)) {
      return [];
    }
    return options.map((item) => {
      if (typeof item === 'string' || typeof item === 'number') {
        return {
          value: `${item}`,
          label: `${item}`, // 转字符串
        };
      }
      return item;
    });
  }
}
