import alias from 'rollup-plugin-alias';
import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import angular from 'rollup-plugin-angular';

export default {
    entry: 'src/vendor.ts',
    dest: 'dist/vendor.es2015.js',
    format: 'iife',
    moduleName: 'vendor',
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