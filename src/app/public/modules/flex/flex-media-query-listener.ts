import {
  SkyFlexMediaBreakpoints
} from './flex-media-breakpoints';

/**
 * Specifies a funciton that is called when the breakpoints change. It is called
 * with a `SkyFlexBreakpoints` argument, which is an enum that represents the new breakpoint.
 */
export type SkyFlexMediaQueryListener = (args: SkyFlexMediaBreakpoints) => void;
