import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';

import {
  SkyFlexAdapterService
} from './flex-adapter-service';

import {
  SkyFlexMediaBreakpoints
} from './flex-media-breakpoints';

import {
  SkyFlexMediaQueryService
} from './flex-media-query.service';

@Component({
  selector: 'sky-flex',
  templateUrl: './flex.component.html',
  styleUrls: ['./flex.component.scss']
})
export class SkyFlexContainerComponent implements AfterContentInit {

  @Input()
  public syncHeight: boolean;

  public set currentBreakpoint(value: string) {
    if (value !== this._currentBreakpoint && value !== 'unknown') {
      this._currentBreakpoint = value;
      this.updateResponsiveClass();
      if (this.syncHeight) {
        this.syncHeightsYo();
      }
    }
  }

  public get currentBreakpoint(): string {
    return this._currentBreakpoint;
  }

  @ViewChild('flexContainerElement', {
    read: ElementRef,
    static: true
  })
  private elementRef: ElementRef;

  private _currentBreakpoint: string;

  constructor(
    private adapterService: SkyFlexAdapterService,
    private changeDetector: ChangeDetectorRef,
    private mediaQueryService: SkyFlexMediaQueryService
  ) { }

  public ngAfterContentInit(): void {
    // Wait for all content to render before detecting parent width.
    setTimeout(() => {
      this.updateResponsiveClass();
      this.mediaQueryService.subscribe((newBreakpoint: SkyFlexMediaBreakpoints) => {
        switch (newBreakpoint) {
          case SkyFlexMediaBreakpoints.xs:
            this.currentBreakpoint = 'xs';
            break;
          case SkyFlexMediaBreakpoints.sm:
            this.currentBreakpoint = 'sm';
            break;
          case SkyFlexMediaBreakpoints.md:
            this.currentBreakpoint = 'md';
            break;
          default:
            this.currentBreakpoint = 'unknown';
        }
      });
      if (this.syncHeight) {
        this.syncHeightsYo();
      }
    });
  }

  private updateResponsiveClass(): void {
    this.adapterService.setResponsiveClass(this.elementRef);
    this.changeDetector.markForCheck();
  }

  private syncHeightsYo(): void {
    console.log('change height!');
    this.adapterService.resetChildHeight(this.elementRef);
    this.changeDetector.detectChanges();
    this.adapterService.syncChildHeight(this.elementRef);
    this.changeDetector.detectChanges();
  }

}
