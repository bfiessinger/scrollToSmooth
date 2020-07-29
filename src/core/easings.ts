/**
 * Define Easing Functions
 * 
 * @param elapsed 
 * @param initialValue 
 * @param amountOfChange 
 * @param duration 
 * 
 * @since 2.2.0
 */

export const linear = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return amountOfChange * elapsed / duration + initialValue;
};

export const easeInQuad = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return amountOfChange * (elapsed /= duration) * elapsed + initialValue;
};

export const easeOutQuad = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return -amountOfChange * (elapsed /= duration) * (elapsed - 2) + initialValue;
};

export const easeInOutQuad = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	if ((elapsed /= duration / 2) < 1) {
		return amountOfChange / 2 * elapsed * elapsed + initialValue;
	}
	return -amountOfChange / 2 * (--elapsed * (elapsed - 2) - 1) + initialValue;
};

export const easeInCubic = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return amountOfChange * (elapsed /= duration) * elapsed * elapsed + initialValue;
};

export const easeOutCubic = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed + 1) + initialValue;
};

export const easeInOutCubic = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	if ((elapsed /= duration / 2) < 1) {
		return amountOfChange / 2 * elapsed * elapsed * elapsed + initialValue;
	}
	return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed + 2) + initialValue;
};

export const easeInQuart = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return amountOfChange * (elapsed /= duration) * elapsed * elapsed * elapsed + initialValue;
};

export const easeOutQuart = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return -amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed * elapsed - 1) + initialValue;
};

export const easeInOutQuart = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	if ((elapsed /= duration / 2) < 1) {
		return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed + initialValue;
	}
	return -amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed - 2) + initialValue;
};

export const easeInQuint = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return amountOfChange * (elapsed /= duration) * elapsed * elapsed * elapsed * elapsed + initialValue;
};

export const easeOutQuint = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed * elapsed * elapsed + 1) + initialValue;
};

export const easeInOutQuint = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	if ((elapsed /= duration / 2) < 1) {
		return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed * elapsed + initialValue;
	}
	return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed * elapsed + 2) + initialValue;
};

export const easeInSine = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return -amountOfChange * Math.cos(elapsed / duration * (Math.PI / 2)) + amountOfChange + initialValue;
};

export const easeOutSine = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return amountOfChange * Math.sin(elapsed / duration * (Math.PI / 2)) + initialValue;
};

export const easeInOutSine = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return -amountOfChange / 2 * (Math.cos(Math.PI * elapsed / duration) - 1) + initialValue;
};

export const easeInExpo = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return elapsed === 0 ? initialValue : amountOfChange * Math.pow(2, 10 * (elapsed / duration - 1)) + initialValue;
};

export const easeOutExpo = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return elapsed === duration
		? initialValue + amountOfChange
		: amountOfChange * (-Math.pow(2, -10 * elapsed / duration) + 1) + initialValue;
};

export const easeInOutExpo = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	if (elapsed === 0) {
		return initialValue;
	}
	if (elapsed === duration) {
		return initialValue + amountOfChange;
	}
	if ((elapsed /= duration / 2) < 1) {
		return amountOfChange / 2 * Math.pow(2, 10 * (elapsed - 1)) + initialValue;
	}
	return amountOfChange / 2 * (-Math.pow(2, -10 * --elapsed) + 2) + initialValue;
};

export const easeInCirc = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return -amountOfChange * (Math.sqrt(1 - (elapsed /= duration) * elapsed) - 1) + initialValue;
};

export const easeOutCirc = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return amountOfChange * Math.sqrt(1 - (elapsed = elapsed / duration - 1) * elapsed) + initialValue;
};

export const easeInOutCirc = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	if ((elapsed /= duration / 2) < 1) {
		return -amountOfChange / 2 * (Math.sqrt(1 - elapsed * elapsed) - 1) + initialValue;
	}
	return amountOfChange / 2 * (Math.sqrt(1 - (elapsed -= 2) * elapsed) + 1) + initialValue;
};

export const easeInElastic = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	let s = 1.70158;
	let p = 0;
	let a = amountOfChange;
	if (elapsed === 0) {
		return initialValue;
	}
	if ((elapsed /= duration) === 1) {
		return initialValue + amountOfChange;
	}
	if (!p) {
		p = duration * 0.3;
	}
	if (a < Math.abs(amountOfChange)) {
		a = amountOfChange;
		s = p / 4;
	} else {
		s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
	}
	return -(a * Math.pow(2, 10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p)) + initialValue;
};

export const easeOutElastic = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	let s = 1.70158;
	let p = 0;
	let a = amountOfChange;
	if (elapsed === 0) {
		return initialValue;
	}
	if ((elapsed /= duration) === 1) {
		return initialValue + amountOfChange;
	}
	if (!p) {
		p = duration * 0.3;
	}
	if (a < Math.abs(amountOfChange)) {
		a = amountOfChange;
		s = p / 4;
	} else {
		s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
	}
	return a * Math.pow(2, -10 * elapsed) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p) + amountOfChange + initialValue;
};

export const easeInOutElastic = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	let s = 1.70158;
	let p = 0;
	let a = amountOfChange;
	if (elapsed === 0) {
		return initialValue;
	}
	if ((elapsed /= duration / 2) === 2) {
		return initialValue + amountOfChange;
	}
	if (!p) {
		p = duration * (0.3 * 1.5);
	}
	if (a < Math.abs(amountOfChange)) {
		a = amountOfChange;
		s = p / 4;
	} else {
		s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
	}
	if (elapsed < 1) {
		return -0.5 * (a * Math.pow(2, 10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p)) + initialValue;
	}
	return (
		a * Math.pow(2, -10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p) * 0.5 + amountOfChange + initialValue
	);
}

export const easeInBack = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	const s = 1.70158;
	return amountOfChange * (elapsed /= duration) * elapsed * ((s + 1) * elapsed - s) + initialValue;
};

export const easeOutBack = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	const s = 1.70158;
	return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * ((s + 1) * elapsed + s) + 1) + initialValue;
};

export const easeInOutBack = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	let s = 1.70158;
	if ((elapsed /= duration / 2) < 1) {
		return amountOfChange / 2 * (elapsed * elapsed * (((s *= 1.525) + 1) * elapsed - s)) + initialValue;
	}
	return amountOfChange / 2 * ((elapsed -= 2) * elapsed * (((s *= 1.525) + 1) * elapsed + s) + 2) + initialValue;
};

export const easeInBounce = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	return amountOfChange - easeOutBounce(duration - elapsed, 0, amountOfChange, duration) + initialValue;
};

export const easeOutBounce = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	if ((elapsed /= duration) < 1 / 2.75) {
		return amountOfChange * (7.5625 * elapsed * elapsed) + initialValue;
	} else if (elapsed < 2 / 2.75) {
		return amountOfChange * (7.5625 * (elapsed -= 1.5 / 2.75) * elapsed + 0.75) + initialValue;
	} else if (elapsed < 2.5 / 2.75) {
		return amountOfChange * (7.5625 * (elapsed -= 2.25 / 2.75) * elapsed + 0.9375) + initialValue;
	} else {
		return amountOfChange * (7.5625 * (elapsed -= 2.625 / 2.75) * elapsed + 0.984375) + initialValue;
	}
};

export const easeInOutBounce = (elapsed: number, initialValue: number, amountOfChange: number, duration: number): number => {
	if (elapsed < duration / 2) {
		return easeInBounce(elapsed * 2, 0, amountOfChange, duration) * 0.5 + initialValue;
	}
	return easeOutBounce(elapsed * 2 - duration, 0, amountOfChange, duration) * 0.5 + amountOfChange * 0.5 + initialValue;
};

export const Easings = {
	linear,
	easeInQuad,
	easeOutQuad,
	easeInOutQuad,
	easeInCubic,
	easeOutCubic,
	easeInOutCubic,
	easeInQuart,
	easeOutQuart,
	easeInOutQuart,
	easeInQuint,
	easeOutQuint,
	easeInOutQuint,
	easeInSine,
	easeOutSine,
	easeInOutSine,
	easeInExpo,
	easeOutExpo,
	easeInOutExpo,
	easeInCirc,
	easeOutCirc,
	easeInOutCirc,
	easeInElastic,
	easeOutElastic,
	easeInOutElastic,
	easeInBack,
	easeOutBack,
	easeInOutBack,
	easeInBounce,
	easeOutBounce,
	easeInOutBounce
};

export default Easings;