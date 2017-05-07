import rollup from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js-harmony';
import css from 'rollup-plugin-css-only';
import image from 'rollup-plugin-image';
import angular from 'rollup-plugin-angular';

export default {
    entry: 'src/main.ts',
    //dest: '../src/main/webapp/bundle.js',
    dest: 'dest/bundle.es2015.js',
    sourceMap: 'inline',
    format: 'iife',
    treeshake: true,
    onwarn: function(warning) {
        // Suppress this error message... there are hundreds of them. Angular team says to ignore it.
        // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
        if (/The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten./.test(warning)) {
            return;
        }
        // should intercept ... but doesn't in some rollup versions
        if (warning.code === 'THIS_IS_UNDEFINED') { return; }

        // console.warn everything else
        console.warn(warning.message)
    },
    plugins: [
        angular(),
        typescript(),
        nodeResolve({
            jsnext: true,
            module: true,
            main: true, // for commonjs modules that have an index.js
            browser: true
        }),
        commonjs({
            include: [
                'node_modules/**',
                'node_modules/primeng/**'
            ],
            namedExports: {
                'node_modules/primeng/primeng.js': [
                    'CheckboxModule',
                    'ButtonModule',
                    'DialogModule',
                    'TabViewModule',
                    'SpinnerModule',
                    'MessagesModule',
                    'GrowlModule',
                    'TooltipModule',
                    'CalendarModule'
                ]
            }
        }),
        uglify({}, minify),
        css({ output: '../src/main/webapp/bundle.css' }),
        image()
    ],
    external: [
        '@angular/core',
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router',
        '@angular/router-deprecated'
    ],
    globals: {
        '@angular/common': 'vendor._angular_common',
        '@angular/compiler': 'vendor._angular_compiler',
        '@angular/core': 'vendor._angular_core',
        '@angular/http': 'vendor._angular_http',
        '@angular/platform-browser': 'vendor._angular_platformBrowser',
        '@angular/platform-browser-dynamic': 'vendor._angular_platformBrowserDynamic',
        '@angular/router': 'vendor._angular_router',
        '@angular/forms': 'vendor._angular_forms'
    }
};