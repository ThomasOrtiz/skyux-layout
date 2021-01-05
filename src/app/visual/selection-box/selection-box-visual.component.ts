import {
  Component
} from '@angular/core';

@Component({
  selector: 'selection-box-visual',
  templateUrl: './selection-box-visual.component.html'
})
export class SelectionBoxVisualComponent {

  public buttonIsClicked: boolean = false;

  // Padding to be applied to the action button container so that the focus outline
  // is fully visible in the screenshot.
  public containerPadding: number = 0;

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
}
