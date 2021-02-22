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

import {
  SkyFlexMediaQueryService
} from './flex-media-query.service';

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
    SkyFlexAdapterService,
    SkyFlexMediaQueryService
  ]
})
export class SkyFlexModule { }
