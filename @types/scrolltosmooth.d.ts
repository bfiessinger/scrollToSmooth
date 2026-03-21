/**
 * ScrollToSmooth – Smooth scroll animation class.
 *
 * All animation, DOM-event, and document-expansion logic lives here as
 * proper instance methods rather than being scattered across multiple
 * files and bound via `.call()`.
 *
 * Horizontal (x-axis) scrolling is NOT included by default. Import and
 * register the HorizontalScrollPlugin to add it:
 *
 *   import { HorizontalScrollPlugin } from 'scrolltosmooth/plugins/horizontal';
 *   ScrollToSmooth.use(HorizontalScrollPlugin);
 */
import { ScrollToSmoothSettings, ScrollPoint, ScrollData, ScrollUpdateData, EasingFunction, AnimationConfig, ScrollToSmoothPlugin } from './types';
export type { ScrollToSmoothSettings as Options, ScrollData, ScrollUpdateData, EasingFunction, ScrollPoint, ScrollToSmoothPlugin };
export declare class ScrollToSmooth {
    elements: NodeListOf<Element>;
    container: Document | HTMLElement | Element;
    settings: ScrollToSmoothSettings;
    /** Animation frame ID – lives on the instance so multiple instances don't collide. */
    protected _animationFrame: number | null;
    /** Stored bound click-handlers so they can be properly removed in destroy(). */
    private _clickHandlers;
    /** Stored bound cancel-scroll handler for proper removal. */
    private _cancelHandler;
    /** Timer used to detect scroll-end in native mode. */
    private _nativeEndTimer;
    /** Registered plugins (keyed by name). */
    private static _plugins;
    /**
     * Register a plugin to extend ScrollToSmooth functionality.
     * Idempotent — calling with the same plugin name a second time is a no-op.
     * Returns the class so calls can be chained.
     *
     * @example
     * import { HorizontalScrollPlugin } from 'scrolltosmooth/plugins/horizontal';
     * ScrollToSmooth.use(HorizontalScrollPlugin);
     */
    static use(plugin: ScrollToSmoothPlugin): typeof ScrollToSmooth;
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
     * Resolve any accepted target type to a raw Y pixel position.
     * Overridable by plugins that need to handle additional target types.
     */
    protected _resolveTargetY(target: HTMLElement | string | number | ScrollPoint, startY: number, docHeight: number, viewHeight: number): number;
    /**
     * Apply the configured offset (element height or fixed px) to a resolved Y position.
     * Overridable by plugins.
     */
    protected _applyOffset(targetY: number): number;
    private _isScrollPoint;
    /**
     * Cancel any in-progress scroll animation.
     */
    cancelScroll(): void;
    /**
     * Merge new settings into the current configuration.
     */
    update(obj: ScrollToSmoothSettings): void;
    protected _dispatchScrollEvent(name: string, detail: ScrollData | ScrollUpdateData): void;
    protected _shouldUseNative(): boolean;
    protected _nativeScrollTo(targetY: number, startY: number): void;
    protected _animateScroll(config: AnimationConfig): void;
    protected _getDuration(distance: number): number;
    protected _resolveEasing(easing: string | EasingFunction | undefined, t: number): number;
    protected _getContainerScrollPosition(_axis: 'x' | 'y'): number;
    protected _setContainerScrollPosition(pos: number, _axis: 'x' | 'y'): void;
    protected _getDocumentSize(_axis: 'x' | 'y'): number;
    protected _getViewportSize(_axis: 'x' | 'y'): number;
    /**
     * Ensure the required expander divs exist in the container.
     * Idempotent — skips creation if already present.
     * Called both from init() and lazily from scrollTo() so that
     * programmatic-only usage (no init()) gets expanders too.
     */
    protected _ensureExpanders(_axis: 'x' | 'y' | 'both'): void;
    protected _expandDocument(scrollPos: number, docSize: number, viewSize: number, _axis?: 'x' | 'y'): void;
    protected _scrollExceedsDocument(pos: number, docSize: number, viewSize: number): {
        direction: string;
        px: number;
    } | false;
    protected _getDocumentExpanders(): HTMLDivElement[];
    private _getTargetElement;
    private _collectLinks;
    private _handleClick;
}
export default ScrollToSmooth;
