import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';

const prettier = require('rollup-plugin-prettier');

const srcScript = 'src/scrolltosmooth.js';
const version = '2.1.4';
const banner = '/**\n\
* Vanilla JS Smooth Scroll\n\
* Author: Bastian Fießinger\n\
* Version: ' + version + '\n\
*/';

// Default
export default [{
  input: srcScript,
  output: {
    file: 'dist/scrolltosmooth.js',
    format: 'iife',
    name: 'scrollToSmooth',
    banner: banner
  },
  plugins: [
    eslint(),
    babel(),
    prettier({
      printWidth: 80,
      tabWidth: 2,
      tabs: true,
      trailingComma: 'es5',
      parser: 'babel'
    }),
  ]
}, {
  input: srcScript,
  output: {
    file: 'dist/scrolltosmooth.min.js',
    format: 'iife',
    name: 'scrollToSmooth',
    banner: banner
  },
  plugins: [
    eslint(),
    babel(),
    prettier({
      printWidth: 80,
      tabWidth: 2,
      tabs: true,
      trailingComma: 'es5',
      parser: 'babel'
    }),
    terser({
      output: {
        comments: function (node, comment) {
          if (comment.type === "comment2") {
            // multiline comment
            return /Vanilla JS Smooth Scroll/i.test(comment.value);
          }
          return false;
        }
      }
    })
  ]
}];