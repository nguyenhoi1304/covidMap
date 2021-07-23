const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
    var config = {
        entry: {
            covidMap: './src/index.js',
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, 'covidMapRoot/dist'),
        },
        devtool: 'eval-cheap-module-source-map',
        devServer: {
            contentBase: './',
            host: '0.0.0.0',
            port: 4001,
            public: 'localhost:4001',
            open: true,
            historyApiFallback: {
                disableDotRule: true
            },
            watchContentBase: true
        },
        plugins: [],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                    ],
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'svg-url-loader',
                            options: {
                                limit: 10000,
                            },
                        },
                    ],
                }
            ],
        },
    };
    if (argv.mode === 'production') {
        config.devtool = 'source-map'
        config.plugins = [
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'covidMapRoot'),
                        to: path.resolve(__dirname, '../CoreApp/CoreApp/wwwroot/covidMapRoot'),
                        globOptions: {
                            ignore: ['dist/*.js', 'dist/*.js.*'],
                        },
                    },
                ],
            }),
        ]
    }
    return config;
};