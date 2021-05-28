const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'), //必须是绝对路径
        filename: '[name].[hash:6].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', //打包后的文件名
            chunks: ['index'] // 只引入index.js
        }),
        new HtmlWebpackPlugin({
            template: './public/login.html',
            filename: 'login.html', //打包后的文件名
            chunks: ['login'] // 只引入login.js
        })
    ],
    devServer: {
        port: '7777', //默认是8080
        quiet: false, //默认不启用
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: "errors-only", //终端仅打印 error
        overlay: false, //默认不启用
        clientLogLevel: "silent", //日志等级
        compress: true, //是否启用 gzip 压缩
    },
    module: {
        rules: [{
                test: /\.(jsx|js)?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    "corejs": 3
                                }
                            ]
                        ]
                    }
                },
                exclude: /node_modules/ //排除 node_modules 目录，
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240, //低于10k的资源将会被转化成base64
                        esModule: true, // 设置为 false，否则，<img src={require('XXX.jpg')} /> 会出现 <img src=[Module Object] />
                        outputPath: 'images/'
                    }
                }]
            }
        ]
    }
}