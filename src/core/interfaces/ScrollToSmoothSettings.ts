export interface ScrollToSmoothSettings {
	// Selectors
	container: string | Document | Element,
	targetAttribute: string;
	offset: Node | Element | string | number | null;
	topOnEmptyHash: boolean;
	// Speed and duration
	duration: number;
	durationRelative: boolean;
	durationMin: number | null;
	durationMax: number | null;
	easing: string | CallableFunction;
	// Callbacks
	onScrollStart: CallableFunction | null;
	onScrollUpdate: CallableFunction | null;
	onScrollEnd: CallableFunction | null;
}
