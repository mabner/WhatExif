const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
	// Defines the entry point of our application for the webpack
	// It is the first file that will be executed and will
	// invoke all the others
	mode: 'development',
	entry: path.join(__dirname, './src/js/index.js'),

	// Setting the output dir for the webpack
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
	},

	// Setting the transpiler (babel) in order to convert
	// our ES6 into ES2015
	resolve: {
		// Setting the extensions that webpack will recognize
		extensions: ['.js', '.html', '.scss'],
	},

	// Webpack Plugins
	plugins: [
		// html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname, 'src/index.html'),
		}),
		new HtmlWebpackPlugin({
			filename: 'confirm_msg.html',
			template: path.join(__dirname, 'src/confirm_msg.html'),
		}),

		// plugin to pack css to external file
		new MiniCssExtractPlugin({
			filename: 'styles.css',
		}),
	],

	// Module loading rules
	module: {
		rules: [
			// babel-loader
			{
				test: /\.js$/,
				exclude: /node_modules/,
				include: path.join(__dirname, 'src'),
				use: [
					{
						loader: 'babel-loader',
						options: {
							// Using babel-preset-env presets
							presets: ['@babel/preset-env'],
						},
					},
				],
			},

			// file-loader module to read the img files
			{
				test: /\.(jpe?g|ico|png|gif|svg)$/i,
				use: 'file-loader?name=img/[name].[ext]',
			},

			// css and style loaders
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '/dist/',
							esModule: true,
						},
					},
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		compress: true,
		port: 9000,
	},
};
