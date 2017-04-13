'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const path = require('path');

module.exports = function() {
    return webpackMerge(commonConfig(), {
        module: {
            rules: [
                { test: /\.ts$/, loaders: ['ts-loader'] }
            ]
        },

        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    warnings: false,
                    screw_ie8: true
                },
                comments: false
            }),

            new webpack.ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)@angular/,
                path.resolve(__dirname, '../src')
            ),
        ]
    });
}