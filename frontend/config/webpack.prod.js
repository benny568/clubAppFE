'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ngToolsWebpack = require('@ngtools/webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var CompressionPlugin = require("compression-webpack-plugin");

const rootDir = path.resolve(__dirname, '../dist/');
const srcDir = path.resolve(__dirname, '../src/');

const commonConfig = require('./webpack.common');

module.exports = function(env) {

    console.log("\n=================================");
    console.log("=== WEBPACK PRODUCTION BUILD! ===");
    console.log("=================================\n");

    return webpackMerge(commonConfig(), {

        entry: {
            app: './src/main.ts',
            vendor: 'src/vendor.ts',
            polyfills: 'src/polyfills.ts'
        },
        output: {
            path: rootDir,
            publicPath: '/',
            filename: '[name].js'
        },
        target: "web",

        module: {
            rules: [
                { test: /\.ts$/, loaders: ['@ngtools/webpack', 'angular2-template-loader'] }
            ]
        },


        plugins: [
            new ngToolsWebpack.AotPlugin({
                tsConfigPath: './tsconfig.json',
                entryModule: path.resolve(srcDir, 'app.module#AppModule')
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
            //new ExtractTextPlugin('[name].css'),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['app', 'vendor', 'polyfills']
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    /*screw_ie8: true,*/
                    keep_fnames: true
                },
                compress: {
                    warnings: false
                        /*,
                                            screw_ie8: true*/
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

            new CompressionPlugin({
                asset: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0
            })
            /*,
                        new BundleAnalyzerPlugin()*/
        ]
    });
}