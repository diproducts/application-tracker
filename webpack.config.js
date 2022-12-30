const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/src/index.js',

    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/client/dist')
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './client/src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    }
}