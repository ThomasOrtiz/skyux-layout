import {
  NgModule
} from '@angular/core';

import {
  SkyAvatarModule
} from '@skyux/avatar';

import {
  SkyDocsToolsModule,
  SkyDocsToolsOptions
} from '@skyux/docs-tools';

import {
  SkyAlertModule,
  SkyKeyInfoModule,
  SkyLabelModule,
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyRepeaterModule,
  SkySortModule
} from '@skyux/lists';

import {
  SkyDropdownModule
} from '@skyux/popovers';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyGridModule
} from '@skyux/grids';

import {
  SkyCodeModule
} from '@blackbaud/skyux-lib-code-block';

import {
  SkyCheckboxModule
} from '@skyux/forms';

import {
  SkyActionButtonModule,
  SkyBackToTopModule,
  SkyCardModule,
  SkyDefinitionListModule,
  SkyDescriptionListModule,
  SkyFluidGridModule,
  SkyFormatModule,
  SkyInlineDeleteModule,
  SkyPageModule,
  SkyPageSummaryModule,
  SkyTextExpandModule,
  SkyTextExpandRepeaterModule,
  SkyToolbarModule
} from './public/public_api';
import { SkyMatrixModule } from './public/modules/matrix/matrix.modue';

@NgModule({
  exports: [
    SkyActionButtonModule,
    SkyAlertModule,
    SkyAppLinkModule,
    SkyAvatarModule,
    SkyBackToTopModule,
    SkyCodeModule,
    SkyCardModule,
    SkyDefinitionListModule,
    SkyDescriptionListModule,
    SkyGridModule,
    SkyDocsToolsModule,
    SkyDropdownModule,
    SkyFluidGridModule,
    SkyCheckboxModule,
    SkyFormatModule,
    SkyIconModule,
    SkyKeyInfoModule,
    SkyLabelModule,
    SkyMatrixModule,
    SkyPageModule,
    SkyPageSummaryModule,
    SkyRepeaterModule,
    SkySortModule,
    SkyTextExpandModule,
    SkyTextExpandRepeaterModule,
    SkyToolbarModule,
    SkyInlineDeleteModule
  ],
  providers: [
    {
      provide: SkyDocsToolsOptions,
      useValue: {
        gitRepoUrl: 'https://github.com/blackbaud/skyux-layout',
        packageName: '@skyux/layout'
      }
    }
  ]
})
export class AppExtrasModule { }
