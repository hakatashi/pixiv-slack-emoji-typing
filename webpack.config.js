const MinifyPlugin = require('babel-minify-webpack-plugin');
const {DefinePlugin} = require('webpack');

module.exports = (env = {}) => ({
	entry: './index.jsx',
	output: {
		path: __dirname,
		filename: 'index.js',
	},
	devtool: env.production ? 'source-map' : 'cheap-module-eval-source-map',
	plugins: [
		new DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(env.production ? 'development' : 'production'),
			},
		}),
		...(env.production ? [
			new MinifyPlugin(),
		] : []),
	],
	module: {
		rules: [{
			test: /\.jsx$/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						['env', {
							targets: [
								'last 2 Chrome versions',
							],
							useBuiltIns: true,
						}],
						'react',
					],
					plugins: [
						'transform-class-properties',
					],
				},
			},
			exclude: /node_modules/,
		}, {
			test: /\.pcss$/,
			use: [{
				loader: 'style-loader',
				options: {
					sourceMap: true,
				},
			}, {
				loader: 'css-loader',
				options: {
					importLoaders: 1,
					minimize: Boolean(env.production),
				},
			}, {
				loader: 'postcss-loader',
				options: {
					sourceMap: true,
				},
			}],
		}, {
			test: /\.csv$/,
			use: {
				loader: 'dsv-loader',
			},
		}],
	},
});
