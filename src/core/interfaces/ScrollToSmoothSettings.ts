export interface ScrollToSmoothSettings {
	targetAttribute: string;
	duration: number;
	durationRelative: boolean;
	durationMin: number | null;
	durationMax: number | null;
	easing: string | CallableFunction;
	onScrollStart: CallableFunction | null;
	onScrollUpdate: CallableFunction | null;
	onScrollEnd: CallableFunction | null;
	fixedHeader: string | null;
	topOnEmptyHash: boolean;
}
