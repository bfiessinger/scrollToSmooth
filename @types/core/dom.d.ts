import type { ScrollToSmooth } from './core';
export declare const docExpanderAttr = "data-scrolltosmooth-expand";
export declare const docExpanderAttrTopValue = "top";
export declare const docExpanderAttrBottomValue = "bottom";
export declare function getTargetElement(this: ScrollToSmooth, el: Element): Element | null;
export declare function linkCollector(this: ScrollToSmooth): Array<Element>;
export declare function clickHandler(this: ScrollToSmooth, el: Element, e: Event): void;
