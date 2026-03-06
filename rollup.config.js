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
	}
]
