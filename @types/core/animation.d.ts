import type { ScrollToSmooth } from './core';
export declare function getDuration(this: ScrollToSmooth, distance: number): number;
export declare function scrollExceedsDocument(pos: number, docHeight: number, winHeight: number): false | {
    to: string;
    px: number;
};
export declare function expandDocument(this: ScrollToSmooth, easing: number, docHeight: number, winHeight: number): void;
export declare function getDocumentExpanders(this: ScrollToSmooth): Array<HTMLDivElement>;
export declare function animateScroll(this: ScrollToSmooth, distFromTop: number, startPos: number, startTime: number, docHeight?: number, winHeight?: number): void;
export declare let scrollAnimationFrame: number;
