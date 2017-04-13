'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const commonConfig = require('./webpack.common');

module.exports = function(env) {
    return webpackMerge(commonConfig(), {
        devServer: {
            contentBase: path.resolve(rootDir, 'dist'),
            port: 9000
        },
        devtool: 'cheap-module-source-map',
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