'use strict';

import path from 'path';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';



const environment = process.env.NODE_ENV || 'development';
const isProd = environment === 'production';
const isDev = environment === 'development';



function getLoaders() {
    const loaders = [
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
    ];
    return loaders;
}



function getPlugins() {
    const plugins = [
        new HtmlWebpackPlugin({
            template: '!!handlebars!src/index.hbs',
            title: 'Goldberg-Radzik Algorithm'
        }),
        new ExtractTextPlugin('[name]', {
            allChunks: true,
            minimize: isProd
        })
    ];
    if (isProd) {
        plugins.push(new webpack.optimize.UglifyJsPlugin());
    }
    else if (isDev) {
    }
    return plugins;
}



const config = {
    entry: {
        'app.js': './src/js/app.js',
        'bootswatch-paper.css': './src/less/bootswatch-customization/paper/build.less',
        'app.css': './src/less/app.less'
    },
    output: {
        path: './dist',
        filename: '[name].js'
    },
    module: {
        loaders: getLoaders()
    },
    plugins: getPlugins(),
    devServer: {
        contentBase: './dist',
        inline: true
    }
};

export default config;
