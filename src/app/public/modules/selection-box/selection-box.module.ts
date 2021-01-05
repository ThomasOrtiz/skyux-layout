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
  SkyCheckboxModule
} from '@skyux/forms';

import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkySelectionBoxContainerComponent
} from './selection-box-container.component';

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
    SkySelectionBoxDescriptionComponent,
    SkySelectionBoxHeaderComponent,
    SkySelectionBoxIconComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SkyCheckboxModule,
    SkyIconModule,
    SkyMediaQueryModule
  ],
  exports: [
    SkySelectionBoxComponent,
    SkySelectionBoxContainerComponent,
    SkySelectionBoxDescriptionComponent,
    SkySelectionBoxHeaderComponent,
    SkySelectionBoxIconComponent
  ]
})
export class SkySelectionBoxModule { }
