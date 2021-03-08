/**
 * Interfaces
 */
import { ScrollToSmoothSettings } from './interfaces/ScrollToSmoothSettings';
export declare class ScrollToSmooth {
    elements: NodeListOf<Element>;
    container: Document | HTMLElement | Element;
    settings: ScrollToSmoothSettings;
    constructor(nodes: (string | HTMLCollectionOf<Element> | NodeListOf<Element> | Element)[], settings: ScrollToSmoothSettings);
    /**
     * Determine the target Element from the targetAttribute of a
     * scrollToSmooth selector
     *
     * @param {Element} el element with the target Attribute
     *
     * @returns {Element | null} valid targetSelector or null
     *
     * @access private
     */
    private getTargetElement;
    /**
     * Filter all scrollto elements that have target attributes related to the current page
     *
     * @returns {array} Array with all links found
     *
     * @access private
     */
    private linkCollector;
    /**
     * Event handler for click events on scrollToSmooth selectors
     *
     * @param {Element} el
     * @param {Event} e The current Event
     *
     * @returns {void}
     *
     * @access private
     */
    private clickHandler;
    /**
     * Take a function name of an easing function and treat it like
     * a real function
     *
     * @param {string} fn
     * @param {number} t
     *
     * @returns {Function}
     *
     * @access private
     */
    private evalTimeFn;
    /**
     * Calculate scroll animation duration
     *
     * @param distance
     *
     * @access private
     */
    private getDuration;
    /**
     * Determine if the current scroll position exceeds the document to
     * the top or bottom.
     *
     * @param {number} pos Current Scroll Position
     *
     * @access private
     */
    private scrollExceedsDocument;
    private expandDocument;
    private getDocumentExpanders;
    /**
     * Animate scrolling
     *
     * @param {number} distFromTop Distance to be scrolled from top
     * @param {number} startPos Distance from top when the animation has started
     * @param {number} startTime The time in ms when the animation has started
     *
     * @returns {void}
     *
     * @access private
     */
    private animateScroll;
    /**
     * Initialize SmoothScroll
     *
     * @returns {void}
     */
    init(): void;
    /**
     * Destroy the current initialization.
     *
     * @returns {void}
     *
     * @access public
     */
    destroy(): void;
    /**
     * Trigger the scrolling animation to a specific Element or
     * a fixed position
     *
     * @param {Element|number} target
     *
     * @returns {void}
     *
     * @access public
     */
    scrollTo(target: HTMLElement | string | number): void;
    /**
     * Scroll by a fixed amount of pixels
     *
     * @param px
     *
     * @return {void}
     */
    scrollBy(px: number): void;
    /**
     * Method: cancelScroll
     *
     * @returns {void}
     */
    cancelScroll(): void;
    /**
     * Method: update
     *
     * @param {ScrollToSmoothSettings} obj The settings to be updated from the original instance
     *
     * @returns {void}
     */
    update(obj: ScrollToSmoothSettings): void;
}
export default ScrollToSmooth;
