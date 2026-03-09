/**
 * HorizontalScrollPlugin – adds x-axis and both-axis scrolling to ScrollToSmooth.
 *
 * Import and register once, before creating any ScrollToSmooth instances:
 *
 *   import { ScrollToSmooth } from 'scrolltosmooth';
 *   import { HorizontalScrollPlugin } from 'scrolltosmooth/plugins/horizontal';
 *
 *   ScrollToSmooth.use(HorizontalScrollPlugin);
 *
 * After registration the following are available on every instance:
 *   - scrollTo(target, 'x' | 'y' | 'both')  – full axis support
 *   - scrollToX(target)                       – horizontal shorthand
 *   - scrollToBoth(x, y)                      – simultaneous x+y scroll
 *   - scrollBy(px, 'x' | 'y')                – relative scroll with axis
 *   - scrollByX(px)                           – relative horizontal scroll
 *   - scrollByBoth(dx, dy)                    – relative x+y scroll
 */
import type { ScrollPoint } from '../types';
declare module '../scrolltosmooth' {
    interface ScrollToSmooth {
        scrollTo(target: HTMLElement | string | number | ScrollPoint, axis?: 'x' | 'y' | 'both'): void;
        scrollToX(target: HTMLElement | string | number): void;
        scrollToBoth(x: number, y: number): void;
        scrollBy(px: number, axis?: 'x' | 'y'): void;
        scrollByX(px: number): void;
        scrollByBoth(dx: number, dy: number): void;
    }
}
export declare const HorizontalScrollPlugin: {
    name: string;
    install(ctor: any): void;
};
