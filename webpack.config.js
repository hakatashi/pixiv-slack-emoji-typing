module.exports = {
	entry: './index.jsx',
	output: {
		path: __dirname,
		filename: 'index.js',
	},
	devtool: 'cheap-module-eval-source-map',
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
				},
			}, {
				loader: 'postcss-loader',
				options: {
					sourceMap: true,
				},
			}],
		}],
	},
};
