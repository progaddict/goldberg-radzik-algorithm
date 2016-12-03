'use strict';

import path from 'path';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';



const environment = process.env.NODE_ENV || 'development';
const isProd = environment === 'production';
const isDev = environment === 'development';



function getPlugins() {
    const plugins = [
        new HtmlWebpackPlugin({
            template: '!!handlebars!src/index.hbs',
            title: 'Goldberg-Radzik Algorithm'
        }),

    ];
    if (isProd) {
        plugins.push(new webpack.optimize.UglifyJsPlugin());
        plugins.push(new ExtractTextPlugin('[name].css', {
            allChunks: true
        }));
    }
    else if (isDev) {
        plugins.push(new ExtractTextPlugin('[name].css', { allChunks: true }));
    }
    return plugins;
}



const config = {
    entry: {
        app: [
            './src/js/index.js',
            './src/less/bootstrap/bootstrap.less'
        ]
    },
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
                loader: 'handlebars'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css-loader!less-loader')
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=/fonts/[name]-[hash].[ext]'
            }
        ]
    },
    plugins: getPlugins()
};

export default config;
