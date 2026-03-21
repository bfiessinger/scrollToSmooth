import * as easings from '../easings';
import { ScrollToSmooth } from '../index';
import { HorizontalScrollPlugin } from '../plugins/horizontal';
import { SnapPlugin } from '../plugins/snap';
import { TouchMomentumPlugin } from '../plugins/touch-momentum';

// Pre-register all bundled plugins so pkgd users get full functionality
// without any extra setup.
ScrollToSmooth.use(HorizontalScrollPlugin);
ScrollToSmooth.use(SnapPlugin);
ScrollToSmooth.use(TouchMomentumPlugin);

Object.assign(window, easings);

export default ScrollToSmooth;
