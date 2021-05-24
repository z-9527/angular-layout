import { getTestBed } from '@angular/core/testing';
import 'zone.js/dist/zone-testing';
import 'zone.js/dist/zone';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(
    _path: string,
    _deep?: boolean,
    _filter?: RegExp
  ): {
    keys(): string[];
    <T>(_id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
