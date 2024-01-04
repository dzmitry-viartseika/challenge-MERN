const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    entry: './index.ts',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'index.js',
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                // exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    externals: [
        nodeExternals(),
        {
            'nock': 'commonjs2 nock',
            'mock-aws-s3': 'commonjs2 mock-aws-s3',
            'aws-sdk': 'mapbox/node-pre-gyp',
            'hiredis': 'redis-parser',
            'bcrypt': 'bcrypt',
            'aws-crt': 'aws-sdk',
        }
    ],
};