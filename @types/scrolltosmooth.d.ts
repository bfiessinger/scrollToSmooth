/**
 * ScrollToSmooth – Smooth scroll animation class.
 *
 * All animation, DOM-event, and document-expansion logic lives here as
 * proper instance methods rather than being scattered across multiple
 * files and bound via `.call()`.
 */
import { ScrollToSmoothSettings, ScrollData, ScrollUpdateData, EasingFunction } from './types';
export type { ScrollToSmoothSettings as Options, ScrollData, ScrollUpdateData, EasingFunction };
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
     * Animate a scroll to the given target (element, selector, or pixel position).
     */
    scrollTo(target: HTMLElement | string | number): void;
    /**
     * Scroll by a relative number of pixels from the current position.
     */
    scrollBy(px: number): void;
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
    private _expandDocument;
    private _scrollExceedsDocument;
    private _getDocumentExpanders;
    private _getTargetElement;
    private _collectLinks;
    private _handleClick;
}
export default ScrollToSmooth;
