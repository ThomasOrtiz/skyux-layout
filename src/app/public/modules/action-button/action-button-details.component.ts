import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  SkyThemeService
} from '@skyux/theme';

import {
  Subject
} from 'rxjs';

import {
  takeUntil
} from 'rxjs/operators';

/**
 * Specifies a description to display on an action button.
 */
@Component({
  selector: 'sky-action-button-details',
  templateUrl: './action-button-details.component.html'
})
export class SkyActionButtonDetailsComponent implements OnDestroy, OnInit {

  public themeName: string;

  private ngUnsubscribe = new Subject();

  constructor(
    private themeSvc: SkyThemeService
  ) {}

  public ngOnInit(): void {
    if (this.themeSvc) {
      this.themeSvc.settingsChange
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe((themeSettings) => {
          this.themeName = themeSettings.currentSettings?.theme?.name;
        });
    }
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
