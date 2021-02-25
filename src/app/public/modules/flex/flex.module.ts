import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyFlexContainerComponent
} from './flex.component';

import {
  SkyFlexAdapterService
} from './flex-adapter-service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SkyFlexContainerComponent
  ],
  exports: [
    SkyFlexContainerComponent
  ],
  providers: [
    SkyFlexAdapterService
  ]
})
export class SkyFlexModule { }
