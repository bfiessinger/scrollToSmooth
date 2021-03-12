# Changelog

### 3.0.1 (Hotfix release)

#### Bug Fixes
- ScrollToSmooth stopped working in version 3.0.0 when the selector to be validated would fail

### 3.0.0

#### Features
- Allow custom easing functions
- Allow a custom amount of pixels to use as an offset (#3)
- Animated scrolling links at the very top or bottom can now exceed the actual document so that easing functions like for example `easeInOutBounce` don't stop animating while exceeding the document.
- Introduced `scrollBy` method
- `scrollTo` now accepts numeric values

#### Enhancements
- Make imports of easings optional to enhance filesize control
- Import linear only per default (see Important Notes)
- Enhanced easing patterns

#### Bug Fixes
- Fixed a bug where the final position was calculated wrong in some situations
- Bundled browser file was not transpiled to es5 

#### Code Quality
- Created a seperate file for each easing function
- Create Typescript declaration files
- Various minor bug fixes and structural improvements
- Add esm bundle
- Add cjs bundle

#### Important Notes
Version 3.0.0 is a major update and comes with some breaking changes:
- Easings are no longer imported by default, you have to import individual easings like `import { easeInQuad, easeOutQuad } from 'scrolltosmooth';`
- The `fixedHeader` option has been renamed to `offset` and accepts a fixed amount of pixels now

### 2.2.1
- Fix broken easings (easeInBack, easeOutBack, easeInOutBack)

### 2.2.0
- Refactor codebase in TypeScript
- Overall Code improvements
- Fixed a bug where the Scrollposition would be calculated wrong if transforms are used (caused errors with libraries like AOS)

### 2.1.5
- Fixed a bug where navigation elements won't work with inner Elements

### 2.1.4
- Fixed npm packagename in readme
- Fixed double semicolon in easings.ts
- Fixed Scrollanimation could stop too late
- Restructured some parts of the code
- Activated babel loose transformation

### 2.1.3
- Fixed wrong compiled code
- Published NPM Release

### 2.1.2
- Bugfix: linear easing not working

### 2.1.1
- Call destroy method on initialization to prevent errors with existing ones
- Added a update Method to edit settings after initialization
- Bugfix: links where not collected correctly in Internet Explorer
- Bugfix: window.performance fix on old Safari's
- Remove Deprecated warnings
- cleaned up some functions

### 2.1.0
- Bugfix: durationMin Parameter must have a minimum value if durationRelative is set
- Bugfix: Scrolling not working if the current location contains a hash *BUMMER*
- Added a destroy Method
- Added a cancelScroll Method
- Added a startScroll Method
- Refactored the scroll function
- overall code improvements

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