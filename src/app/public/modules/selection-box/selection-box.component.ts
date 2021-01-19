import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

import {
  SkyCoreAdapterService
} from '@skyux/core';

import {
  SkyCheckboxComponent
} from '@skyux/forms/modules/checkbox/checkbox.component';

import {
  SkyRadioComponent
} from '@skyux/forms/modules/radio/radio.component';

import {
  SkyCheckboxChange,
  SkyRadioChange
} from '@skyux/forms';

/**
 * Creates a button to present users with an option to move forward with tasks.
 */
@Component({
  selector: 'sky-selection-box',
  styleUrls: ['./selection-box.component.scss'],
  templateUrl: './selection-box.component.html'
})
export class SkySelectionBoxComponent implements AfterContentInit {

/**
 * Fires when users select the action button.
 */
  @Output()
  public actionClick = new EventEmitter<any>();

  @Input()
  public control: SkyCheckboxComponent | SkyRadioComponent;

  public set selected(value: boolean) {
    this._selected = value;
    if (this.control) {
      this.control.checked = value;
    }
  }

  public get selected(): boolean {
    return this._selected;
  }

  @ViewChild('skySelectionBoxButton', {
    read: ElementRef,
    static: false
  })
  private buttonEl: ElementRef;

  private _selected: boolean = false;

  constructor(
    private adapterService: SkyCoreAdapterService
  ) {}

  public ngAfterContentInit(): void {
    setTimeout(() => {
      this.setTabIndexOfFocusableElems(this.buttonEl.nativeElement, -1);
      this.bindToControl();
      this.setButtonState();
    });
  }

  public onClick(): void {
    this.selected = !this.selected;
    this.actionClick.emit();
  }

  public onEnter(): void {
    this.selected = !this.selected;
    this.actionClick.emit();
  }

  private bindToControl(): void {
    const checkboxComponent = <SkyCheckboxComponent>this.control;
    const radioComponent = <SkyRadioComponent>this.control;

    // TODO: is this the right way to bind to these controls?
    if (checkboxComponent) {
      checkboxComponent.change.subscribe((change: SkyCheckboxChange) => {
        this.selected = change.checked;
      });
    }

    if (radioComponent) {
      radioComponent.change.subscribe((change: SkyRadioChange) => {
        this.selected = change.value === radioComponent.value;
      });
    }
  }

  private setButtonState(): void {
    this.selected = this.control?.checked;
  }

  private setTabIndexOfFocusableElems(element: HTMLElement, tabIndex: number): void {
    const focusableElems = this.adapterService.getFocusableChildren(element, {
      ignoreVisibility: true
    });
    let index = focusableElems.length;
    while (index--) {
      focusableElems[index].tabIndex = tabIndex;
    }
  }
}
