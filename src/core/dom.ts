import type { ScrollToSmooth } from './core';
import { 
	_$, 
	_$$, 
	forEach,
	validateSelector,
	getBaseURI
} from './helpers/scrollToSmoothHelper';

export const docExpanderAttr = 'data-scrolltosmooth-expand';
export const docExpanderAttrTopValue = 'top';
export const docExpanderAttrBottomValue = 'bottom';

export function getTargetElement(this: ScrollToSmooth, el: Element): Element | null {
	let targetSelector = '';
	if ( this.settings.targetAttribute === 'href' && (el as HTMLAnchorElement).href ) {
		targetSelector = (el as HTMLAnchorElement).href.replace(getBaseURI(el), '');
	} else if ( el.getAttribute(this.settings.targetAttribute as string) ) {
		targetSelector = el.getAttribute(this.settings.targetAttribute as string) as string;
	}
	
	// Top on Empty Hash
	if (this.settings.topOnEmptyHash && targetSelector == '#') {
		return this.container as Element;
	}
	
	return ( validateSelector(targetSelector, this.container) ) ? _$(targetSelector, this.container as HTMLElement) : null;
}

export function linkCollector(this: ScrollToSmooth): Array<Element> {
	const links: Array<Element> = [];
	forEach(this.elements, (el: Element) => {
		if (getTargetElement.call(this, el)) {
			const anchor = el as HTMLAnchorElement;
			if ( ( this.settings.targetAttribute === 'href' && anchor.href.indexOf(getBaseURI(el)) != -1 && anchor.href.indexOf('#') != -1 && (anchor.hash != '' || this.settings.topOnEmptyHash) ) || this.settings.targetAttribute != 'href' ) {
				links.push(el);
			}
		}
	});
	return links;
}

export function clickHandler(this: ScrollToSmooth, el: Element, e: Event): void {
	e.stopPropagation();
	e.preventDefault();
	const currentTarget = getTargetElement.call(this, el);
	if (!currentTarget) {
		return;
	}
	this.scrollTo(currentTarget as HTMLElement);
}
