'use strict';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = {
    target: 'web',
    externals: ['react'],
    resolve: {
        modules: [
            'node_modules',
            'bower_components'
        ]
    },
    entry: './src/js/app.js',
    output: {
        path: './dist',
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=/fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '!!handlebars!src/index.hbs',
            title: 'Goldberg-Radzik Algorithm'
        })
    ],
    devServer: {
        contentBase: './dist',
        inline: true
    }
};

export default config;
