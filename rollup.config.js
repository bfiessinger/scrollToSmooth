// Pkg Information
const pkg = require('./package.json');

// Plugins
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const banner = '/*!\n\
* ScrollToSmooth\n\
* Author: ' + pkg.author + '\n\
* Version: ' + pkg.version + '\n\
*/';

const defaultPlugins = [
	resolve(),
	commonjs(),
	typescript(),
	babel(),
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

// Default
export default [
	{
		input: 'build/core.ts',
		output: {
			file: 'dist/scrolltosmooth.min.js',
			format: 'umd',
			name: 'scrollToSmooth',
			banner: banner
		},
		plugins: defaultPlugins
	},
	{
		input: 'build/pkgd.ts',
		output: {
			file: 'dist/scrolltosmooth.pkgd.min.js',
			format: 'umd',
			name: 'scrollToSmooth',
			banner: banner
		},
		plugins: defaultPlugins
	}
]
