// compile-time type checks for ScrollToSmooth typings
import ScrollToSmooth, { Options, ScrollData, ScrollUpdateData, EasingFunction, linear } from './scrolltosmooth';

// Options should be optional
const opts: Options = {
    duration: 300,
    easing: linear,
    onScrollStart: (data: ScrollData) => {
        console.log(data.startPosition, data.endPosition);
    },
    onScrollUpdate: (data: ScrollUpdateData) => {
        console.log(data.currentPosition);
    }
};

const scroller = new ScrollToSmooth('a', opts);

scroller.scrollTo(100);
scroller.scrollTo('.section');
// scroller.scrollTo({}); // should error if uncommented

scroller.update({ durationMax: 1000 });

// Easing function type
const customEase: EasingFunction = (t) => t * t;

// Ensure Options alias works
const opts2: Options = { easing: customEase };

// test partial update
scroller.update(opts2);

export {};
