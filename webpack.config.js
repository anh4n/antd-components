const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const DOCS_DIR = path.resolve(__dirname, 'docs');

module.exports = {
    entry: [
        DOCS_DIR + '/index.jsx'
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: __dirname + '/docs/dist',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(scss|sass|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ]
    },
    plugins: [
        new CopyPlugin([
            { from: 'node_modules/tinymce', to: 'tinymce' }
        ])
    ],
    devServer: {
        host: '0.0.0.0',
        hot: true,
        contentBase: DOCS_DIR,
        publicPath: '/antd-components/dist/'
    }
};
