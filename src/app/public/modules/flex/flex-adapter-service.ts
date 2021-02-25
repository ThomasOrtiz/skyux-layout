import {
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2
} from '@angular/core';

import {
  SkyMediaBreakpoints
} from '@skyux/core';

import {
  BehaviorSubject
} from 'rxjs';

import {
  SkyFlexBreakpoint
} from './types/flex-breakpoint';

const SKY_FLEX_CONTAINTER_CLASS_SM = 'sky-flex-container-sm';
const SKY_FLEX_CONTAINTER_CLASS_MD = 'sky-flex-container-md';
const SKY_FLEX_CONTAINER_SM_MAX_WIDTH = 991;

/**
 * @internal
 */
@Injectable()
export class SkyFlexAdapterService {

  /**
   * Returns the current breakpoint.
   */
  public get current(): SkyFlexBreakpoint {
    return this._current;
  }

  private currentSubject = new BehaviorSubject<SkyFlexBreakpoint>(this.current);

  private _current = SkyFlexBreakpoint.sm;

  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(undefined, undefined);
  }

  /**
   * Adds responsive CSS class on the provided element, based on its current width.
   */
  public setResponsiveClass(element: ElementRef, breakpoint: SkyMediaBreakpoints): void {
    const nativeEl: HTMLElement = element.nativeElement;

    this.renderer.removeClass(nativeEl, 'sky-responsive-container-xs');
    this.renderer.removeClass(nativeEl, 'sky-responsive-container-sm');
    this.renderer.removeClass(nativeEl, 'sky-responsive-container-md');
    this.renderer.removeClass(nativeEl, 'sky-responsive-container-lg');

    let newClass: string;

    switch (breakpoint) {
      case SkyMediaBreakpoints.xs: {
        newClass = 'sky-responsive-container-xs';
        break;
      }
      case SkyMediaBreakpoints.sm: {
        newClass = 'sky-responsive-container-sm';
        break;
      }
      case SkyMediaBreakpoints.md: {
        newClass = 'sky-responsive-container-md';
        break;
      }
      default: {
        newClass = 'sky-responsive-container-lg';
        break;
      }
    }

    this.renderer.addClass(nativeEl, newClass);
  }

  /**
   * Remove inline height styles for direct decendants.
   */
  public resetChildHeight(elementRef: ElementRef): void {
    const children = this.getImmediateChildren(elementRef);
    // tslint:disable-next-line: no-null-keyword
    children.forEach(item => item.style.height = null);
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

  public getWidth(elementRef: ElementRef): number {
    return elementRef.nativeElement.clientWidth;
  }

  /**
   * Returns immediate children of the provided elementRef.
   */
  private getImmediateChildren(elementRef: ElementRef): NodeListOf<HTMLElement> {
    return elementRef.nativeElement.querySelectorAll(':scope > *');
  }

  /**
   * Returns the appropriate CSS class name based on the width of the element.
   */
  private getResponsiveClassName(width: number): string {
    if (width <= SKY_FLEX_CONTAINER_SM_MAX_WIDTH) {
      return SKY_FLEX_CONTAINTER_CLASS_SM;
    } else {
      return SKY_FLEX_CONTAINTER_CLASS_MD;
    }
  }

  private notifyBreakpointChange(breakpoint: SkyFlexBreakpoint): void {
    this._current = breakpoint;
    this.currentSubject.next(breakpoint);
  }

}
