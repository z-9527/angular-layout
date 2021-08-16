import { TemplateRef } from '@angular/core';

export type StringTemplateRef = string | TemplateRef<any>;

export interface IField extends Record<string, any> {
  label?: StringTemplateRef;
  key?: string;
  ref?: StringTemplateRef;
  format?: (_data, _key: string) => string | number;
  ellipsis?: boolean;
  type?: 'link' | 'date';
  link?: (_data, _key: string) => string;
  hideExpression?: (_data) => boolean;
}
