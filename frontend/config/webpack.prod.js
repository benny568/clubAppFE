'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ngToolsWebpack = require('@ngtools/webpack');
const path = require('path');

const rootDir = path.resolve(__dirname, '../dist/unbundled-aot/');

const commonConfig = require('./webpack.common');

module.exports = function(env) {

    console.log("\n=================================");
    console.log("=== WEBPACK PRODUCTION BUILD! ===");
    console.log("=================================\n");

    return webpackMerge(commonConfig(), {

        entry: [
            './dist/unbundled-aot/src/vendor.js',
            './dist/unbundled-aot/src/polyfills.js',
            './dist/unbundled-aot/src/main-aot.js'
        ],
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(rootDir, '../src/main/webapp/')
        },
        target: "web",

        module: {
            rules: [
                { test: /\.ts$/, loader: '@ngtools/webpack' }
            ]
        },


        plugins: [
            new ngToolsWebpack.AotPlugin({
                tsConfigPath: '../frontend/tsconfig-aot.json'
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: true
            }),
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
            )
        ]
    });
}