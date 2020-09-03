const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.css$/,
                loader: 'lit-css-loader'
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                'src/mockServiceWorker.js'
            ]
        }),
        new CheckerPlugin(),
        new HtmlWebpackPlugin()
    ],
    devServer: {
        historyApiFallback: true
    }
};