import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

/**
 * Creates a button to present users with an option to move forward with tasks.
 */
@Component({
  selector: 'sky-selection-box',
  styleUrls: ['./selection-box.component.scss'],
  templateUrl: './selection-box.component.html'
})
export class SkySelectionBoxComponent {

/**
 * Fires when users select the action button.
 */
  @Output()
  public actionClick = new EventEmitter<any>();

  public buttonClicked(): void {
    this.actionClick.emit();
  }

  public enterPress(): void {
    this.actionClick.emit();
  }
}
