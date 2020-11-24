import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
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

import {
  SkyActionButtonPermalink
} from './action-button-permalink';

/**
 * Creates a button to present users with an option to move forward with tasks.
 */
@Component({
  selector: 'sky-action-button',
  styleUrls: ['./action-button.component.scss'],
  templateUrl: './action-button.component.html'
})
export class SkyActionButtonComponent implements OnDestroy, OnInit {

/**
 * Specifies a link for the action button.
 */
  @Input()
  public permalink: SkyActionButtonPermalink;

/**
 * Fires when users select the action button.
 */
  @Output()
  public actionClick = new EventEmitter<any>();

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

  public buttonClicked(): void {
    this.actionClick.emit();
  }

  public enterPress(): void {
    this.actionClick.emit();
  }
}
