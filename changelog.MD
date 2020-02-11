# Changelog

### 2.0.1
- Renamed callback to onScrollEnd
- Added Callback function onScrollStart
- Added Callback function onScrollUpdate
- Added additional data parameter for all callback functions
- Fixed a bug where the animation would stop too early
- Added a durationRelative Parameter to calculate the duration based on the amount of pixel to scroll
- Added durationMin and durationMax Parameters

### 2.0.0
- Moved from an AnchorElement Prototype to a class construct.
- Improvement: Now working with any HTML element not just a tags
- Improvement: Give the user a setting to define with attribute to use for determine the target
- Improvement: Only collect links that are related with elements on the page
- Added https://www.npmjs.com/package/js-easing-functions for smoother Easings
- Stop the animation after duration has passed
- Changed settings.speed to settings.duration

### 1.0.1
- Added some vendor Prefixes
- Fixed a bug where on some devices the scrolltop was not calculated correctly and so the animation would run forever
- Added the ability to let the user cancel the animation by scrolling

### 1.0.0
- Initial Release