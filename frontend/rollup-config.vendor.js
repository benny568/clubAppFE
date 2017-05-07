import alias from 'rollup-plugin-alias';
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import angular from 'rollup-plugin-angular';

export default {
    entry: 'src/vendor.ts',
    dest: 'dest/vendor.es2015.js',
    format: 'iife',
    moduleName: 'vendor',
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
        typescript(),
        angular(),
        alias({ rxjs: __dirname + '/node_modules/rxjs-es' }),
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
    ]
}