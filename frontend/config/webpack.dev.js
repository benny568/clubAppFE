'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const commonConfig = require('./webpack.common');

module.exports = function(env) {

    console.log("\n==========================");
    console.log("=== DEVELOPMENT BUILD! ===");
    console.log("==========================\n");

    return webpackMerge(commonConfig(), {
        entry: {
            app: [path.resolve(rootDir, 'src', 'main')],
            vendor: [path.resolve(rootDir, 'src', 'vendor')],
            polyfills: [path.resolve(rootDir, 'src', 'polyfills')]
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(rootDir, '../src/main/webapp/'),
            sourceMapFilename: '[name].map',
            chunkFilename: "[name].[chunkhash].js"
        },
        devServer: {
            contentBase: path.resolve(rootDir, 'dist'),
            port: 9900
        },
        devtool: 'cheap-module-source-map',
        module: {
            rules: [
                { test: /\.ts$/, loader: 'awesome-typescript-loader' }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('development'),
                    'DEBUG': JSON.stringify('true')
                }
            }),
        ]
    });
}