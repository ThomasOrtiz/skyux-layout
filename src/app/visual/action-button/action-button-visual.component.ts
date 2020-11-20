import {
  Component
} from '@angular/core';

import {
  SkyThemeService,
  SkyThemeSettings
} from '@skyux/theme';

@Component({
  selector: 'action-button-visual',
  templateUrl: './action-button-visual.component.html'
})
export class ActionButtonVisualComponent {

  public buttonIsClicked: boolean = false;

  // Padding to be applied to the action button container so that the focus outline
  // is fully visible in the screenshot.
  public containerPadding: number = 0;

  public permalink = {
    url: 'https://developer.blackbaud.com/skyux/components'
  };

  constructor(
    private themeSvc: SkyThemeService
  ) {}

  public applyFocus(): void {
    this.containerPadding = 15;
    const actionButton: HTMLElement = document
      .getElementById('screenshot-action-button')
      .querySelector('.sky-action-button');
    actionButton.focus();
  }

  public buttonClicked(): void {
    this.buttonIsClicked = true;
  }

  public themeSettingsChange(themeSettings: SkyThemeSettings): void {
    this.themeSvc.setTheme(themeSettings);
  }
}
