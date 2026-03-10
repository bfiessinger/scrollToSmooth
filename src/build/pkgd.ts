import * as easings from '../easings';
import { ScrollToSmooth } from '../index';
import { HorizontalScrollPlugin } from '../plugins/horizontal';

// Pre-register all bundled plugins so pkgd users get full functionality
// without any extra setup.
ScrollToSmooth.use(HorizontalScrollPlugin);

Object.assign(window, easings);

export default ScrollToSmooth;
