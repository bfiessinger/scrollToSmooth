/**
 * IIFE build entry-point for SnapPlugin.
 *
 * When loaded as a plain <script> tag after scrolltosmooth.min.js, this file:
 *   1. Bundles the plugin (no core dependency)
 *   2. Exposes `window.SnapPlugin` for manual access
 *   3. Auto-registers with `window.scrollToSmooth` if already present
 *
 * Usage:
 *   <script src="dist/scrolltosmooth.min.js"></script>
 *   <script src="dist/plugins/snap.iife.min.js"></script>
 *   <!-- plugin is now registered, no extra call needed -->
 */
import { SnapPlugin } from '../../plugins/snap';
declare global {
    interface Window {
        scrollToSmooth?: {
            use(plugin: typeof SnapPlugin): void;
        };
    }
}
export default SnapPlugin;
