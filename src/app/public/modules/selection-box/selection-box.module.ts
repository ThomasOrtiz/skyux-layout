import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  RouterModule
} from '@angular/router';

import {
  SkyMediaQueryModule
} from '@skyux/core';

import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkySelectionBoxContainerComponent
} from './selection-box-container.component';

import {
  SkySelectionBoxControlComponent
} from './selection-box-control.component';

import {
  SkySelectionBoxDescriptionComponent
} from './selection-box-description.component';

import {
  SkySelectionBoxHeaderComponent
} from './selection-box-header.component';

import {
  SkySelectionBoxIconComponent
} from './selection-box-icon.component';

import {
  SkySelectionBoxComponent
} from './selection-box.component';

@NgModule({
  declarations: [
    SkySelectionBoxComponent,
    SkySelectionBoxContainerComponent,
    SkySelectionBoxControlComponent,
    SkySelectionBoxDescriptionComponent,
    SkySelectionBoxHeaderComponent,
    SkySelectionBoxIconComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SkyIconModule,
    SkyMediaQueryModule
  ],
  exports: [
    SkySelectionBoxComponent,
    SkySelectionBoxContainerComponent,
    SkySelectionBoxControlComponent,
    SkySelectionBoxDescriptionComponent,
    SkySelectionBoxHeaderComponent,
    SkySelectionBoxIconComponent
  ]
})
export class SkySelectionBoxModule { }
