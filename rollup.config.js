// Pkg Information
const pkg = require('./package.json');

// Plugins
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

const banner = '/*!\n\
* ScrollToSmooth\n\
* Author: ' + pkg.author + '\n\
* Version: ' + pkg.version + '\n\
*/';

const iifePlugins = [
	resolve({
		extensions: extensions
	}),
	commonjs(),
	typescript(),
	babel({
		"extensions": extensions,
		"babelHelpers": "bundled",
		"include": [
			"build/**/*",
			"src/**/*"
		],
	}),
	terser({
		compress: {
			typeofs: false
		},
		output: {
			comments: function (node, comment) {
				if (comment.line === 1) {
					return true;
				}
				return false;
			}
		}
	})
];

const modulePlugins = [
	// Allows node_modules resolution
	resolve({
		extensions
	}),

	// Allow bundling cjs modules. Rollup doesn't understand cjs
	commonjs(),

	// Compile TypeScript/JavaScript files
	babel({
		extensions,
		babelHelpers: 'bundled',
		include: ['src/**/*'],
	}),
];

// Default
export default [
	{
		input: 'src/build/core.ts',
		external: [],
		output: [{
			file: 'dist/scrolltosmooth.min.js',
			format: 'iife',
			name: 'scrollToSmooth',
			banner: banner
		}],
		plugins: iifePlugins
	},
	{
		input: 'src/build/pkgd.ts',
		external: [],
		output: {
			file: pkg.browser,
			format: 'iife',
			name: 'scrollToSmooth',
			banner: banner
		},
		plugins: iifePlugins
	},
	{
		input: 'src/scrolltosmooth.ts',
		external: [],
		output: {
			file: pkg.main,
			format: 'cjs',
			banner: banner,
			exports: 'named'
		},
		plugins: modulePlugins
	},
	{
		input: 'src/scrolltosmooth.ts',
		external: [],
		output: {
			file: pkg.module,
			format: 'es',
			banner: banner
		},
		plugins: modulePlugins
	}
]
