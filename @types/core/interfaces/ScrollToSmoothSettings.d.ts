export interface ScrollToSmoothSettings {
    container: string | Document | Element;
    targetAttribute: string;
    offset: Node | Element | string | number | null;
    topOnEmptyHash: boolean;
    duration: number;
    durationRelative: boolean;
    durationMin: number | null;
    durationMax: number | null;
    easing: string | CallableFunction;
    onScrollStart: CallableFunction | null;
    onScrollUpdate: CallableFunction | null;
    onScrollEnd: CallableFunction | null;
}
