import {
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2
} from '@angular/core';

import {
  SkyMediaBreakpoints
} from '@skyux/core';

const SM_BREAKPOINT_MAX_PIXELS = 991;

/**
 * @internal
 */
@Injectable()
export class SkyFlexAdapterService {

  public get currentBreakpoint(): SkyMediaBreakpoints {
    return this._currentBreakpoint;
  }

  private renderer: Renderer2;

  private _currentBreakpoint = SkyMediaBreakpoints.xs;

  constructor(
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(undefined, undefined);
  }

  /**
   * Returns immediate child elements of the provided elementRef.
   */
  public getImmediateChildren(elementRef: ElementRef): NodeListOf<HTMLElement> {
    return elementRef.nativeElement.querySelectorAll(':scope > *');
  }

  /**
   * Returns the clientWidth of the provided elementRef.
   */
  public getWidth(elementRef: ElementRef): number {
    return elementRef.nativeElement.clientWidth;
  }

  /**
   * Remove inline height styles for direct decendants.
   */
  public resetChildHeight(elementRef: ElementRef): void {
    const children = this.getImmediateChildren(elementRef);
    // tslint:disable-next-line: no-null-keyword
    children.forEach(item => item.style.height = null);
  }

  public setBreakpointForWidth(width: number): void {
    let breakpoint: SkyMediaBreakpoints;

    if (width <= SM_BREAKPOINT_MAX_PIXELS) {
      breakpoint = SkyMediaBreakpoints.sm;
    } else {
      breakpoint = SkyMediaBreakpoints.md;
    }

    this._currentBreakpoint = breakpoint;
  }

  /**
   * Adds responsive CSS class on the provided element, based on its current width.
   */
  public setResponsiveClass(element: ElementRef, breakpoint: SkyMediaBreakpoints): void {
    const nativeEl: HTMLElement = element.nativeElement;

    this.renderer.removeClass(nativeEl, 'sky-responsive-container-sm');
    this.renderer.removeClass(nativeEl, 'sky-responsive-container-md');

    let newClass: string;

    // tslint:disable-next-line: switch-default
    switch (breakpoint) {
      case SkyMediaBreakpoints.sm: {
        newClass = 'sky-responsive-container-sm';
        break;
      }
      case SkyMediaBreakpoints.md: {
        newClass = 'sky-responsive-container-md';
        break;
      }
    }

    this.renderer.addClass(nativeEl, newClass);
  }

  /**
   * Synchronizes all children to have the same height as the tallest child element.
   */
  public syncChildHeight(elementRef: ElementRef): void {
    const children = this.getImmediateChildren(elementRef);
    let maxHeight = 0;
    children.forEach((el: HTMLElement) => {
      maxHeight = Math.max(maxHeight, el.offsetHeight);
    });
    children.forEach(item => item.style.height = maxHeight + 'px');
  }

}
