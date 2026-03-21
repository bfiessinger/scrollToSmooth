/**
 * ScrollToSmooth Easing Functions
 * 
 * @since 3.0.0
 */
import { linear } from './easings/linear';
import type { EasingFunction } from './types';
import { easeInQuad } from './easings/easeInQuad';
import { easeOutQuad } from './easings/easeOutQuad';
import { easeInOutQuad } from './easings/easeInOutQuad';
import { easeInCubic } from './easings/easeInCubic';
import { easeOutCubic } from './easings/easeOutCubic';
import { easeInOutCubic } from './easings/easeInOutCubic';
import { easeInQuart } from './easings/easeInQuart';
import { easeOutQuart } from './easings/easeOutQuart';
import { easeInOutQuart } from './easings/easeInOutQuart';
import { easeInQuint } from './easings/easeInQuint';
import { easeOutQuint } from './easings/easeOutQuint';
import { easeInOutQuint } from './easings/easeInOutQuint';
import { easeInSine } from './easings/easeInSine';
import { easeOutSine } from './easings/easeOutSine';
import { easeInOutSine } from './easings/easeInOutSine';
import { easeInExpo } from './easings/easeInExpo';
import { easeOutExpo } from './easings/easeOutExpo';
import { easeInOutExpo } from './easings/easeInOutExpo';
import { easeInCirc } from './easings/easeInCirc';
import { easeOutCirc } from './easings/easeOutCirc';
import { easeInOutCirc } from './easings/easeInOutCirc';
import { easeInElastic } from './easings/easeInElastic';
import { easeOutElastic } from './easings/easeOutElastic';
import { easeInOutElastic } from './easings/easeInOutElastic';
import { easeInBack } from './easings/easeInBack';
import { easeOutBack } from './easings/easeOutBack';
import { easeInOutBack } from './easings/easeInOutBack';
import { easeInBounce } from './easings/easeInBounce';
import { easeOutBounce } from './easings/easeOutBounce';
import { easeInOutBounce } from './easings/easeInOutBounce';

export {
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

// helper for people still wanting to use names; this file is only pulled in by
// pkgd or by callers who explicitly import from easings, so bundlers can
// effectively drop unused functions when the core isn't referencing them.
export function getEasing(name: string): EasingFunction | undefined {
	switch (name) {
		case 'linear': return linear;
		case 'easeInQuad': return easeInQuad;
		case 'easeOutQuad': return easeOutQuad;
		case 'easeInOutQuad': return easeInOutQuad;
		case 'easeInCubic': return easeInCubic;
		case 'easeOutCubic': return easeOutCubic;
		case 'easeInOutCubic': return easeInOutCubic;
		case 'easeInQuart': return easeInQuart;
		case 'easeOutQuart': return easeOutQuart;
		case 'easeInOutQuart': return easeInOutQuart;
		case 'easeInQuint': return easeInQuint;
		case 'easeOutQuint': return easeOutQuint;
		case 'easeInOutQuint': return easeInOutQuint;
		case 'easeInSine': return easeInSine;
		case 'easeOutSine': return easeOutSine;
		case 'easeInOutSine': return easeInOutSine;
		case 'easeInExpo': return easeInExpo;
		case 'easeOutExpo': return easeOutExpo;
		case 'easeInOutExpo': return easeInOutExpo;
		case 'easeInCirc': return easeInCirc;
		case 'easeOutCirc': return easeOutCirc;
		case 'easeInOutCirc': return easeInOutCirc;
		case 'easeInElastic': return easeInElastic;
		case 'easeOutElastic': return easeOutElastic;
		case 'easeInOutElastic': return easeInOutElastic;
		case 'easeInBack': return easeInBack;
		case 'easeOutBack': return easeOutBack;
		case 'easeInOutBack': return easeInOutBack;
		case 'easeInBounce': return easeInBounce;
		case 'easeOutBounce': return easeOutBounce;
		case 'easeInOutBounce': return easeInOutBounce;
		default: return undefined;
	}
}
