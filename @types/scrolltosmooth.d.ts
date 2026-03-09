/**
 * ScrollToSmooth – Smooth scroll animation class.
 *
 * All animation, DOM-event, and document-expansion logic lives here as
 * proper instance methods rather than being scattered across multiple
 * files and bound via `.call()`.
 */
import { ScrollToSmoothSettings, ScrollPoint, ScrollData, ScrollUpdateData, EasingFunction } from './types';
export type { ScrollToSmoothSettings as Options, ScrollData, ScrollUpdateData, EasingFunction, ScrollPoint };
export declare class ScrollToSmooth {
    elements: NodeListOf<Element>;
    container: Document | HTMLElement | Element;
    settings: ScrollToSmoothSettings;
    /** Animation frame ID – lives on the instance so multiple instances don't collide. */
    private _animationFrame;
    /** Stored bound click-handlers so they can be properly removed in destroy(). */
    private _clickHandlers;
    /** Stored bound cancel-scroll handler for proper removal. */
    private _cancelHandler;
    constructor(nodes: string | HTMLCollectionOf<Element> | NodeListOf<Element> | Element | (string | HTMLCollectionOf<Element> | NodeListOf<Element> | Element)[], settings?: ScrollToSmoothSettings);
    /**
     * Wire up click-listeners on trigger elements and scroll-cancel
     * listeners on the window. Creates document-expander divs used by
     * bounce-type easings.
     */
    init(): void;
    /**
     * Remove all event listeners and document expanders created by init().
     */
    destroy(): void;
    /**
     * Animate a scroll to the given target.
     * @param target  Element, CSS selector, pixel offset, or `{x, y}` ScrollPoint.
     * @param axis    Override the instance-level `axis` setting for this call.
     */
    scrollTo(target: HTMLElement | string | number | ScrollPoint, axis?: 'x' | 'y' | 'both'): void;
    /**
     * Animate a horizontal scroll to the given target. Shorthand for `scrollTo(target, 'x')`.
     */
    scrollToX(target: HTMLElement | string | number): void;
    /**
     * Animate a simultaneous scroll to the given x/y coordinates.
     * Shorthand for `scrollTo({ x, y }, 'both')`.
     */
    scrollToBoth(x: number, y: number): void;
    /**
     * Scroll by a relative number of pixels from the current position.
     * @param axis Override axis ('x' or 'y'). Defaults to instance axis, or 'y' when axis is 'both'.
     */
    scrollBy(px: number, axis?: 'x' | 'y'): void;
    /**
     * Scroll horizontally by a relative number of pixels. Shorthand for `scrollBy(px, 'x')`.
     */
    scrollByX(px: number): void;
    /**
     * Scroll both axes simultaneously by relative pixel amounts.
     */
    scrollByBoth(dx: number, dy: number): void;
    /**
     * Cancel any in-progress scroll animation.
     */
    cancelScroll(): void;
    /**
     * Merge new settings into the current configuration.
     */
    update(obj: ScrollToSmoothSettings): void;
    private _animateScroll;
    private _getDuration;
    private _resolveEasing;
    private _getContainerScrollPosition;
    private _setContainerScrollPosition;
    private _setContainerScrollPositionBoth;
    private _getDocumentSize;
    private _getViewportSize;
    /**
     * Ensure the required expander divs exist in the container.
     * Idempotent — skips creation if already present.
     * Called both from init() and lazily from scrollTo() so that
     * programmatic-only usage (no init()) gets expanders too.
     */
    private _ensureExpanders;
    private _expandDocument;
    private _scrollExceedsDocument;
    private _getDocumentExpanders;
    private _getTargetElement;
    private _collectLinks;
    private _handleClick;
}
export default ScrollToSmooth;
