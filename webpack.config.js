const path = require('path');

// Plugins
const TerserJSPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = [
  // Compile Javascript
  {
    mode: 'production',
    entry: {
      scrolltosmooth: './src/scrolltosmooth.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
			filename: '[name].min.js',
			library: 'scrollToSmooth',
			libraryTarget: 'window',
			libraryExport: 'default'
		},
    optimization: {
			usedExports: true,
      minimize: true,
      minimizer: [
        new TerserJSPlugin({
          sourceMap: true,
          terserOptions: {
						warnings: false,
						mangle: true,
						module: false,
						ie8: false,
            output: {
              comments: false,
            },
          },
          extractComments: false,
        })
      ],
		},
    module: {
      rules: [
        {
          test: /\.((j|t)sx?)$/,
          exclude: /node_modules/,
          use: [
						'babel-loader'
					]
				},
				{
					test: /\.js$/,
					use: ["source-map-loader"],
					enforce: "pre"
				},
      ]
		},
		resolve: {
			extensions: [ '.tsx', '.ts', '.js' ],
		},
		plugins: [
			//new BundleAnalyzerPlugin()
		]
  }
];
