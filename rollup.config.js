// Pkg Information
const pkg = require('./package.json');

// Plugins
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
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
		commonjs(),
  	typescript(),
    babel(),
    terser({
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