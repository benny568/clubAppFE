'use strict';

const HtmlWebpack = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ChunkWebpack = webpack.optimize.CommonsChunkPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
var WebpackChunkHash = require("webpack-chunk-hash");

const rootDir = path.resolve(__dirname, '..');

module.exports = function() {
    return {

        module: {
            rules: [{
                    test: /\.(html|css)$/,
                    loader: 'raw-loader',
                    exclude: /\.async\.(html|css)$/
                },
                {
                    test: /\.(png|jpe?g|gif|ico|doc)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        }
                    }]
                },

                /* Font files - used in PrimeNG */
                { test: /\.svg$/, loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' },
                { test: /\.woff$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
                { test: /\.woff2$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
                { test: /\.[ot]tf$/, loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
                { test: /\.eot$/, loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' }
            ]
        },

        plugins: [

            /*new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest'], // Specify the common bundle's name.
                minChunks: function(module) {
                    // this assumes your vendor imports exist in the node_modules directory
                    return module.context && module.context.indexOf('node_modules') !== -1;
                }
            }),*/
            new webpack.HashedModuleIdsPlugin(),
            new WebpackChunkHash(),
            new ChunkManifestPlugin({
                filename: "chunk-manifest.json",
                manifestVariable: "webpackManifest"
            }),
            new HtmlWebpack({
                filename: 'index.html',
                inject: 'body',
                title: 'Avenue United Website',
                template: path.resolve(rootDir, 'src', 'index.html')
            }),
            new ManifestPlugin(),
            new webpack.ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                __dirname
            )
        ],
        resolve: {
            extensions: ['.js', '.ts'],
            modules: [path.join(__dirname, 'src'), 'node_modules']
        }
    }
}