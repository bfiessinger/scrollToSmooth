/**
 * Data passed to the `onScrollStart` and `onScrollEnd` callbacks.
 * @template T the unit type (usually `number` representing pixels).
 */
export interface ScrollData<T = number> {
	startPosition: T;
	endPosition: T;
}

/**
 * Data passed to the `onScrollUpdate` callback.
 */
export interface ScrollUpdateData<T = number> extends ScrollData<T> {
	currentPosition: T;
	/** Normalized animation progress in the range [0, 1]. */
	progress: number;
}

/**
 * An explicit two-axis scroll target.
 */
export interface ScrollPoint {
	x: number;
	y: number;
}

/**
 * A valid easing function accepts a normalized progress value (0–1)
 * and returns the eased progress.
 */
export type EasingFunction = (t: number) => number;

/**
 * Plugin interface. A plugin's `install` method is called once with the
 * ScrollToSmooth constructor and is responsible for augmenting the prototype.
 */
export interface ScrollToSmoothPlugin {
	name: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	install(ctor: any): void;
}

/**
 * Configuration object passed to the internal `_animateScroll` method.
 * The index signature allows plugins (e.g. HorizontalScrollPlugin) to
 * pass additional fields (targetX, startX, …) without TypeScript errors.
 */
export interface AnimationConfig {
	targetY: number;
	startY: number;
	docHeight: number;
	viewHeight: number;
	startTime: number;
	[key: string]: unknown;
}

/**
 * A single item in the scroll queue, created by `queueScroll()`.
 */
export interface ScrollQueueItem {
	/** The scroll target (same types accepted by `scrollTo`). */
	target: HTMLElement | string | number | ScrollPoint;
	/**
	 * Optional identifier. Pass to `clearQueue(id)` or `cancelScroll()` to
	 * remove only this item from the queue.
	 */
	id?: string;
}

/**
 * Configuration options for a ScrollToSmooth instance.
 * All properties are optional; defaults are applied internally.
 */
export interface ScrollToSmoothSettings {
	// Selectors
	container?: string | Document | Element;
	targetAttribute?: string;
	/**
	 * Pixel amount, element (whose height is used), CSS selector, or a
	 * percent / viewport-height string to subtract from the target position.
	 * Percent strings (`'10%'`) and `vh` strings (`'5vh'`) are re-evaluated
	 * against the viewport height on every scroll, so they adapt to resizing.
	 * @example offset: '10%'   // 10 % of the viewport height
	 * @example offset: '64px'  // fixed 64 px (same as the number 64)
	 * @example offset: '#nav'  // height of the #nav element
	 */
	offset?: Node | Element | string | number | null;
	topOnEmptyHash?: boolean;
	// Axis
	axis?: 'x' | 'y' | 'both';
	// Speed and duration
	duration?: number;
	durationRelative?: boolean | number;
	durationMin?: number | null;
	durationMax?: number | null;
	easing?: string | EasingFunction;
	// Native smooth scrolling
	/**
	 * When `true`, delegate scrolling to `element.scrollTo({ behavior: 'smooth' })`
	 * instead of running the JS animation loop.
	 * When `'auto'`, use native only when the browser supports `scroll-behavior: smooth`.
	 * Defaults to `false` (always use JS animation).
	 */
	useNative?: boolean | 'auto';
	/**
	 * When `false`, skip dispatching `scrolltosmooth:start`, `scrolltosmooth:update`,
	 * and `scrolltosmooth:end` CustomEvents on the scroll container.
	 * Defaults to `true`.
	 */
	dispatchEvents?: boolean;
	// Scroll snapping
	/**
	 * When `true` or `'nearest'`, automatically snap to the nearest anchor
	 * after the user stops scrolling.
	 * Defaults to `false` (no snapping).
	 */
	snap?: boolean | 'nearest';
	/**
	 * CSS selector that identifies snap target elements.
	 * When omitted, the linked elements' targets (resolved via `targetAttribute`) are used.
	 */
	snapSelector?: string;
	/**
	 * Milliseconds of scroll inactivity to wait before triggering a snap.
	 * Defaults to `150`.
	 */
	snapDebounce?: number;
	// Touch momentum
	/**
	 * When `true`, a fast swipe gesture triggers a momentum scroll animation
	 * after the finger is lifted, giving the page an inertia feel.
	 * Disabled by default to avoid interfering with native scroll behaviour.
	 */
	touchMomentum?: boolean;
	/**
	 * Multiplier (in milliseconds) applied to the swipe velocity to compute
	 * the extra momentum distance.  Higher values = more "throw".
	 * Defaults to `300`.
	 */
	touchMomentumFactor?: number;
	/**
	 * Minimum swipe velocity in px/ms required to trigger a momentum scroll.
	 * Swipes slower than this are ignored.
	 * Defaults to `0.3`.
	 */
	touchMomentumMinVelocity?: number;
	// Callbacks
	onScrollStart?: ((data: ScrollData) => void) | null;
	onScrollUpdate?: ((data: ScrollUpdateData) => void) | null;
	onScrollEnd?: ((data: ScrollData) => void) | null;
}
