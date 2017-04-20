import rollup from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import css from 'rollup-plugin-css-only';
import image from 'rollup-plugin-image';

export default {
    entry: 'src/main-aot.js',
    dest: '../src/main/webapp/bundle.js',
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
        uglify(),
        css({ output: '../src/main/webapp/bundle.css' }),
        image()
    ]
};