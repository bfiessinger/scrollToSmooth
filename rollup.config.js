// Pkg Information
const pkg = require('./package.json');

// Plugins
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

const srcScript = pkg.main;

const banner = '/**\n\
* ScrollToSmooth\n\
* Author: ' + pkg.author + '\n\
* Version: ' + pkg.version + '\n\
*/';

// Default
export default [{
  input: srcScript,
  output: {
    file: 'dist/scrolltosmooth.min.js',
    format: 'umd',
    name: 'scrollToSmooth',
    banner: banner
  },
  plugins: [
		resolve(),
		commonjs(),
  	typescript(),
		babel(),
		json(),
    terser({
			compress: {
				drop_console: false,
				keep_fargs: false,
				typeofs: false
			},
      output: {
        comments: function (node, comment) {
          if (comment.type === "comment2") {
            // multiline comment
            return /\*\sScrollToSmooth/i.test(comment.value);
          }
          return false;
        }
      }
    })
  ]
}];