'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const commonConfig = require('./webpack.common');

module.exports = function(env) {
    return webpackMerge(commonConfig(), {

        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production'),
                    'DEBUG': JSON.stringify('false')
                }
            }),
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

            // Workaround for angular/angular#11580
            new webpack.ContextReplacementPlugin(
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /angular(\\|\/)core(\\|\/)@angular/,
                path.resolve(__dirname, '../src'), // location of your src
                {} // a map of your routes
            ),
        ]
    });
}