'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ngToolsWebpack = require('@ngtools/webpack');
const path = require('path');

const rootDir = path.resolve(__dirname, '../dist/');

const commonConfig = require('./webpack.common');

module.exports = function(env) {

    console.log("\n=================================");
    console.log("=== WEBPACK PRODUCTION BUILD! ===");
    console.log("=================================\n");

    return webpackMerge(commonConfig(), {

        entry: [
            './src/main.ts'
        ],
        output: {
            path: '/home/odalybr/dev/clubAppFE/frontend/dist',
            publicPath: '/',
            filename: 'app.main.js'
        },
        target: "web",

        module: {
            rules: [
                { test: /\.ts$/, loader: '@ngtools/webpack' }
            ]
        },


        plugins: [
            new ngToolsWebpack.AotPlugin({
                tsConfigPath: './tsconfig.json',
                entryModule: '/home/odalybr/dev/clubAppFE/frontend/src/app.module#AppModule'
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