import * as path from "path";
import nodeExternals from "webpack-node-externals";

const config = {
    entry: './index.ts',
    target: 'node',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },

    externals: [nodeExternals()],

    node: {
        __dirname: false,
        __filename: false,
    },

    devtool: 'source-map',
}

module.exports = config