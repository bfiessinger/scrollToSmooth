export interface ScrollToSmoothSettings {
	container: string | Element,
	targetAttribute: string;
	duration: number;
	durationRelative: boolean;
	durationMin: number | null;
	durationMax: number | null;
	easing: string | CallableFunction;
	onScrollStart: CallableFunction | null;
	onScrollUpdate: CallableFunction | null;
	onScrollEnd: CallableFunction | null;
	offset: Node | Element | string | number | null;
	topOnEmptyHash: boolean;
}
