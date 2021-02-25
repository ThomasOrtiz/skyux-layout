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
  SkyFlexMediaQueryService
} from './flex-media-query.service';

import {
  SkyFlexJustify
} from './types/flex-justify';

@Component({
  selector: 'sky-flex',
  templateUrl: './flex.component.html',
  styleUrls: ['./flex.component.scss'],
  providers: [
    SkyFlexMediaQueryService
  ]
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
    }
  }

  private get currentBreakpoint(): SkyMediaBreakpoints {
    return this._currentBreakpoint || SkyMediaBreakpoints.sm;
  }

  private _currentBreakpoint: SkyMediaBreakpoints;

  constructor(
    private adapterService: SkyFlexAdapterService,
    private changeDetector: ChangeDetectorRef,
    private mediaQueryService: SkyFlexMediaQueryService
  ) {
    console.log(this.currentBreakpoint);
  }

  public ngAfterContentInit(): void {
    // Wait for all content to render before detecting parent width.
    setTimeout(() => {
      this.updateBreakpointAndResponsiveClass();
      this.changeDetector.markForCheck();
      if (this.syncHeight) {
        this.syncChildrenHeight();
      }
    });
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    this.updateBreakpointAndResponsiveClass();
    this.changeDetector.markForCheck();
    if (this.syncHeight) {
      this.syncChildrenHeight();
    }
  }

  private syncChildrenHeight(): void {
    this.adapterService.resetChildHeight(this.elementRef);
    this.changeDetector.detectChanges();
    this.adapterService.syncChildHeight(this.elementRef);
    this.changeDetector.detectChanges();
  }

  private updateBreakpointAndResponsiveClass(): void {
    const width = this.adapterService.getWidth(this.elementRef);
    this.mediaQueryService.setBreakpointForWidth(width);
    const newBreakpiont = this.mediaQueryService.current;
    this.adapterService.setResponsiveClass(this.elementRef, newBreakpiont);
  }

}
