import type { ScrollToSmooth } from './core';
import { 
	reqAnimFrame,
	getDocHeight,
	getWinHeight,
	getTime
} from './helpers/scrollToSmoothHelper';
import { w } from './global_vars';
import { resolveEasing } from './easing';
import { docExpanderAttr, docExpanderAttrTopValue, docExpanderAttrBottomValue } from './dom';

export function getDuration(this: ScrollToSmooth, distance: number) {
	let duration = Math.max(1, this.settings.duration as number);
	
	// Calculate duration relative to the distance scrolled
	if (this.settings.durationRelative) {
		const durationRelativePx = (typeof this.settings.durationRelative == 'number') ? this.settings.durationRelative : 1000;
		duration = Math.max(this.settings.duration as number, distance * (duration / durationRelativePx));
	}
	
	// Set a minimum duration
	if (this.settings.durationMin && duration < ( this.settings.durationMin as number ) ) {
		duration = this.settings.durationMin as number;
	}
	
	// Set a maximum duration
	if (this.settings.durationMax && duration > ( this.settings.durationMax as number ) ) {
		duration = this.settings.durationMax as number;
	}
	
	return duration;
}

export function scrollExceedsDocument(pos: number, docHeight: number, winHeight: number): false | { to: string; px: number } {
	const min = 0;
	const max = docHeight - winHeight;
	
	if ( pos < min ) {
		return {
			to: docExpanderAttrTopValue,
			px: pos * -1
		};
	} else if ( pos > max ) {
		return {
			to: docExpanderAttrBottomValue,
			px: (max - pos) * -1
		};
	} 
	
	return false;
}

export function expandDocument(this: ScrollToSmooth, easing: number, docHeight: number, winHeight: number) {
	const exceeding = scrollExceedsDocument(easing, docHeight, winHeight);
	const expanders = getDocumentExpanders.call(this);
	const expT = expanders.filter(el=>el.getAttribute(docExpanderAttr) === docExpanderAttrTopValue)[0] as HTMLElement;
	const expB = expanders.filter(el=>el.getAttribute(docExpanderAttr) === docExpanderAttrBottomValue)[0] as HTMLElement;
	
	if (exceeding && expT && exceeding.to === docExpanderAttrTopValue) {
		expT.style.height = easing + 'px';
	} else if (exceeding && expB && exceeding.to === docExpanderAttrBottomValue) {
		expB.style.height = easing + 'px';
	} else {
		expanders.forEach(exp => {
			(exp as HTMLElement).style.removeProperty('height');
		});
	}
}

export function getDocumentExpanders(this: ScrollToSmooth): Array<HTMLDivElement> {
	return Array.prototype.slice.call(this.container.children).filter(el=>el.hasAttribute(docExpanderAttr));
}

export function animateScroll(this: ScrollToSmooth, distFromTop: number, startPos: number, startTime: number, docHeight?: number, winHeight?: number) {
	const elapsed = getTime() - startTime;
	const duration = getDuration.call(this, Math.abs(distFromTop - startPos));
	const t = Math.min(1, elapsed / duration);
	const easingPattern = resolveEasing(this.settings.easing, t);
	const timeFunction = startPos + (distFromTop - startPos) * easingPattern;

	if (this.settings.onScrollUpdate && typeof this.settings.onScrollUpdate == 'function') {
		this.settings.onScrollUpdate({
			startPosition: startPos,
			currentPosition: timeFunction,
			endPosition: distFromTop
		});
	}

	w.scroll(0, timeFunction);

	if (!docHeight) {
		docHeight = getDocHeight();
	}
	if (!winHeight) {
		winHeight = getWinHeight();
	}

	expandDocument.call(this, timeFunction, docHeight, winHeight);

	if (elapsed >= duration) {
		if (this.settings.onScrollEnd && typeof this.settings.onScrollEnd == 'function') {
			this.settings.onScrollEnd({
				startPosition: startPos,
				endPosition: distFromTop
			});
		}
		return;
	}

	scrollAnimationFrame = reqAnimFrame(() => {
		animateScroll.call(this, distFromTop, startPos, startTime, docHeight, winHeight);
	});
}

export let scrollAnimationFrame: number;