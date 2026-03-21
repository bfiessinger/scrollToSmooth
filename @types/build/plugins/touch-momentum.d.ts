/**
 * IIFE build entry-point for TouchMomentumPlugin.
 *
 * When loaded as a plain <script> tag after scrolltosmooth.min.js, this file:
 *   1. Bundles the plugin (no core dependency)
 *   2. Exposes `window.TouchMomentumPlugin` for manual access
 *   3. Auto-registers with `window.scrollToSmooth` if already present
 *
 * Usage:
 *   <script src="dist/scrolltosmooth.min.js"></script>
 *   <script src="dist/plugins/touch-momentum.iife.min.js"></script>
 *   <!-- plugin is now registered, no extra call needed -->
 */
import { TouchMomentumPlugin } from '../../plugins/touch-momentum';
declare global {
    interface Window {
        scrollToSmooth?: {
            use(plugin: typeof TouchMomentumPlugin): void;
        };
    }
}
export default TouchMomentumPlugin;
