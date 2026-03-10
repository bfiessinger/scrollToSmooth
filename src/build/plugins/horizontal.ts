/**
 * IIFE build entry-point for HorizontalScrollPlugin.
 *
 * When loaded as a plain <script> tag after scrolltosmooth.min.js, this file:
 *   1. Bundles the plugin (no core — dom utils only)
 *   2. Exposes `window.HorizontalScrollPlugin` for manual access
 *   3. Auto-registers with `window.scrollToSmooth` if already present
 *
 * Usage:
 *   <script src="dist/scrolltosmooth.min.js"></script>
 *   <script src="dist/plugins/horizontal.iife.min.js"></script>
 *   <!-- plugin is now registered, no extra call needed -->
 */
import { HorizontalScrollPlugin } from '../../plugins/horizontal';

declare global {
	interface Window {
		// The IIFE core/pkgd builds expose the class as window.scrollToSmooth
		scrollToSmooth?: { use(plugin: typeof HorizontalScrollPlugin): void };
	}
}

if (
	typeof window !== 'undefined'
	&& window.scrollToSmooth
	&& typeof window.scrollToSmooth.use === 'function'
) {
	window.scrollToSmooth.use(HorizontalScrollPlugin);
}

export default HorizontalScrollPlugin;
