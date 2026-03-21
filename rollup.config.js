// Pkg Information
import pkg from './package.json' with { type: 'json' };

// Plugins
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

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
	typescript({ declaration: false }),
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
		format: {
			comments: (_node, comment) => comment.line === 1
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

// prepare an array of easing entry points so we can output them separately
import fs from 'fs';
import path from 'path';
const easingFiles = fs.readdirSync(path.resolve('src/easings'))
	.filter(f=>f.endsWith('.ts'))
	.map(f=>path.join('src/easings', f));

// plugin entry points
const pluginFiles = fs.readdirSync(path.resolve('src/plugins'))
	.filter(f=>f.endsWith('.ts'))
	.map(f=>path.join('src/plugins', f));


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
		input: 'src/index.ts',
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
		input: 'src/index.ts',
		external: [],
		output: {
			file: pkg.module,
			format: 'es',
			banner: banner
		},
		plugins: modulePlugins
	},
	{
		input: easingFiles,
		external: [],
		output: {
			dir: 'dist/easings',
			format: 'es',
			entryFileNames: '[name].js',
			banner: banner
		},
		plugins: modulePlugins
	},
	// Plugins – ESM (tree-shakeable, for bundlers)
	// utils/dom is intentionally bundled inline so the plugin file is self-contained
	// and consumers don't need a separate dist/utils/dom.js file.
	{
		input: pluginFiles,
		external: ['../scrolltosmooth'],
		output: {
			dir: 'dist/plugins',
			format: 'es',
			entryFileNames: '[name].js',
			banner: banner,
			paths: {
				'../scrolltosmooth': '../scrolltosmooth.esm.js',
			},
		},
		plugins: modulePlugins
	},
	// Plugins – CJS (for Node / require())
	{
		input: pluginFiles,
		external: ['../scrolltosmooth'],
		output: {
			dir: 'dist/plugins',
			format: 'cjs',
			entryFileNames: '[name].cjs.js',
			banner: banner,
			exports: 'named',
			paths: {
				'../scrolltosmooth': '../scrolltosmooth.cjs.js',
			},
		},
		plugins: modulePlugins
	},
	// Plugins – IIFE (plain <script> tag, auto-registers with window.scrollToSmooth)
	{
		input: 'src/build/plugins/horizontal.ts',
		external: [],
		output: {
			file: 'dist/plugins/horizontal.iife.min.js',
			format: 'iife',
			name: 'HorizontalScrollPlugin',
			exports: 'default',
			banner: banner,
		},
		plugins: iifePlugins
	},
	{
		input: 'src/build/plugins/snap.ts',
		external: [],
		output: {
			file: 'dist/plugins/snap.iife.min.js',
			format: 'iife',
			name: 'SnapPlugin',
			exports: 'default',
			banner: banner,
		},
		plugins: iifePlugins
	},
	{
		input: 'src/build/plugins/touch-momentum.ts',
		external: [],
		output: {
			file: 'dist/plugins/touch-momentum.iife.min.js',
			format: 'iife',
			name: 'TouchMomentumPlugin',
			exports: 'default',
			banner: banner,
		},
		plugins: iifePlugins
	},
]
