import {
  Injectable,
  NgZone,
  OnDestroy
} from '@angular/core';

import {
  BehaviorSubject,
  Subscription
} from 'rxjs';

import {
  SkyFlexMediaBreakpoints
} from './flex-media-breakpoints';

import {
  SkyFlexMediaQueryListener
} from './flex-media-query-listener';

@Injectable()
export class SkyFlexMediaQueryService implements OnDestroy {

  /**
   * The size for the `xs` breakpoint.
   */
  public static xs = '(max-width: 767px)';

  /**
   * The size for the `sm` breakpoint.
   */
  public static sm = '(min-width: 768px) and (max-width: 991px)';

  /**
   * The size for the `md` breakpoint.
   */
  public static md = '(min-width: 992px) and (max-width: 1199px)';

  /**
   * Returns the current breakpoint.
   */
  public get current(): SkyFlexMediaBreakpoints {
    return this._current;
  }

  private currentSubject = new BehaviorSubject<SkyFlexMediaBreakpoints>(this.current);

  private _current = SkyFlexMediaBreakpoints.md;

  private breakpoints: {
    mediaQueryString: string,
    name: SkyFlexMediaBreakpoints
  }[] = [
    {
      mediaQueryString: SkyFlexMediaQueryService.xs,
      name: SkyFlexMediaBreakpoints.xs
    },
    {
      mediaQueryString: SkyFlexMediaQueryService.sm,
      name: SkyFlexMediaBreakpoints.sm
    },
    {
      mediaQueryString: SkyFlexMediaQueryService.md,
      name: SkyFlexMediaBreakpoints.md
    }
  ];

  private mediaQueries: {
    mediaQueryList: MediaQueryList,
    listener: ((event: any) => void)
  }[] = [];

  constructor(
    private zone: NgZone
  ) {
    this.addListeners();
  }

  public ngOnDestroy(): void {
    this.removeListeners();
    this.currentSubject.complete();
  }

  /**
   * Suscribes to screen size changes.
   * @param listener Specifies a function that is called when breakpoints change.
   */
  public subscribe(listener: SkyFlexMediaQueryListener): Subscription {
    return this.currentSubject.subscribe({
      next: (breakpoints: SkyFlexMediaBreakpoints) => {
        listener(breakpoints);
      }
    });
  }

  /**
   * @internal
   */
  public destroy(): void {
    this.removeListeners();
    this.currentSubject.complete();
  }

  private addListeners(): void {
    this.mediaQueries = this.breakpoints.map((breakpoint: any) => {
      const mq = matchMedia(breakpoint.mediaQueryString);

      const listener = (event: any) => {
        // Run the check outside of Angular's change detection since Angular
        // does not wrap matchMedia listeners in NgZone.
        // See: https://blog.assaf.co/angular-2-change-detection-zones-and-an-example/
        this.zone.run(() => {
          if (event.matches) {
            this.notifyBreakpointChange(breakpoint.name);
          }
        });
      };

      mq.addListener(listener);

      if (mq.matches) {
        this.notifyBreakpointChange(breakpoint.name);
      }

      return {
        mediaQueryList: mq,
        listener
      };
    });
  }

  private removeListeners(): void {
    this.mediaQueries.forEach((mediaQuery) => {
      mediaQuery.mediaQueryList.removeListener(mediaQuery.listener);
    });
    this.mediaQueries = [];
  }

  private notifyBreakpointChange(breakpoint: SkyFlexMediaBreakpoints): void {
    this._current = breakpoint;
    this.currentSubject.next(breakpoint);
  }
}
