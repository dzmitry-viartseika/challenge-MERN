const path = require('path');

module.exports = {
    mode: 'production',
    entry: './index.ts',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'final.js',
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    externals: [
        {
            'nock': 'commonjs2 nock',
            'mock-aws-s3': 'commonjs2 mock-aws-s3',
            'aws-sdk': 'mapbox/node-pre-gyp',
            'hiredis': 'redis-parser',
            'bcrypt': 'bcrypt'
        }
    ],
};