import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyMatrixComponent } from './matrix.component';
import { SkyMatrixItemComponent } from './matrix-item.component';

@NgModule({
  declarations: [
    SkyMatrixComponent,
    SkyMatrixItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyMatrixComponent,
    SkyMatrixItemComponent
  ]
})
export class SkyMatrixModule { }
