/*
* Copyright (c) 2022-2022.
* Author Peter Placzek (tada5hi)
* For the full copyright and license information,
* view the LICENSE file that was distributed with this source code.
*/
import { builtinModules } from 'node:module';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import swc from '@rollup/plugin-swc';
import json from '@rollup/plugin-json';
import terser from "@rollup/plugin-terser";
import pkg from './package.json' assert {type: 'json'};

const extensions = [
    '.js', '.jsx', '.ts', '.tsx',
];

export default [
    {
        input: './src/index.ts',
        external: builtinModules,
        plugins: [
            resolve({ extensions}),

            commonjs(),

            json(),

            swc(),

            terser()
        ],
        output: [
            {
                file: pkg.main,
                format: 'cjs'
            }
        ]
    }
];
