import {
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2
} from '@angular/core';

const SKY_FLEX_CONTAINTER_CLASS_XS = 'sky-flex-container-xs';
const SKY_FLEX_CONTAINTER_CLASS_SM = 'sky-flex-container-sm';
const SKY_FLEX_CONTAINTER_CLASS_MD = 'sky-flex-container-md';
const SKY_FLEX_CONTAINTER_CLASS_LG = 'sky-flex-container-lg';

/**
 * @internal
 */
@Injectable()
export class SkyFlexAdapterService {

  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(undefined, undefined);
  }

  /**
   * Adds responsive CSS class on the provided element, based on its current width.
   */
  public setResponsiveClass(element: ElementRef): void {
    const nativeEl: any = element.nativeElement;
    const width = element.nativeElement.clientWidth;
    const className = this.getResponsiveClassName(width);

    this.renderer.removeClass(nativeEl, SKY_FLEX_CONTAINTER_CLASS_XS);
    this.renderer.removeClass(nativeEl, SKY_FLEX_CONTAINTER_CLASS_SM);
    this.renderer.removeClass(nativeEl, SKY_FLEX_CONTAINTER_CLASS_MD);
    this.renderer.removeClass(nativeEl, SKY_FLEX_CONTAINTER_CLASS_LG);

    this.renderer.addClass(nativeEl, className);
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
    const xsBreakpointMaxPixels = 767;
    const smBreakpointMinPixels = 768;
    const smBreakpointMaxPixels = 991;
    const mdBreakpointMinPixels = 992;
    const mdBreakpointMaxPixels = 1439;

    if (width <= xsBreakpointMaxPixels) {
      return SKY_FLEX_CONTAINTER_CLASS_XS;
    } else if (width >= smBreakpointMinPixels && width <= smBreakpointMaxPixels) {
      return SKY_FLEX_CONTAINTER_CLASS_SM;
    } else if (width >= mdBreakpointMinPixels && width <= mdBreakpointMaxPixels) {
      return SKY_FLEX_CONTAINTER_CLASS_MD;
    } else {
      return SKY_FLEX_CONTAINTER_CLASS_LG;
    }
  }

}
