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
