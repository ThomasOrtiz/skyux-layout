import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild
} from '@angular/core';

import {
  SkyMediaBreakpoints
} from '@skyux/core';

import {
  SkyFlexAdapterService
} from './flex-adapter-service';

import {
  SkyFlexJustify
} from './types/flex-justify';

@Component({
  selector: 'sky-flex',
  templateUrl: './flex.component.html',
  styleUrls: ['./flex.component.scss']
})
export class SkyFlexContainerComponent implements AfterContentInit {

  @Input()
  public syncHeight: boolean;

  @Input()
  public justify: SkyFlexJustify = SkyFlexJustify.center;

  @ViewChild('flexContainerElement', {
    read: ElementRef,
    static: true
  })
  private elementRef: ElementRef;

  private set currentBreakpoint(value: SkyMediaBreakpoints) {
    if (value !== this._currentBreakpoint) {
      this._currentBreakpoint = value;
      if (this.syncHeight) {
        this.updateChildHeight();
      }
    }
  }

  private get currentBreakpoint(): SkyMediaBreakpoints {
    return this._currentBreakpoint || SkyMediaBreakpoints.sm;
  }

  private _currentBreakpoint: SkyMediaBreakpoints;

  constructor(
    private adapterService: SkyFlexAdapterService,
    private changeDetector: ChangeDetectorRef
  ) {}

  public ngAfterContentInit(): void {
    // Wait for all content to render before detecting parent width.
    setTimeout(() => {
      this.updateBreakpointAndResponsiveClass();
      this.changeDetector.markForCheck();
      if (this.syncHeight) {
        this.updateChildHeight();
      }
    });
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    this.updateBreakpointAndResponsiveClass();
    this.changeDetector.markForCheck();
  }

  private updateChildHeight(): void {
    setTimeout(() => {
      this.adapterService.resetChildHeight(this.elementRef);
      this.adapterService.syncChildHeight(this.elementRef);
    });
  }

  private updateBreakpointAndResponsiveClass(): void {
    const width = this.adapterService.getWidth(this.elementRef);
    this.adapterService.setBreakpointForWidth(width);
    this.currentBreakpoint = this.adapterService.currentBreakpoint;
    this.adapterService.setResponsiveClass(this.elementRef, this.currentBreakpoint);
  }

}
