const path = require('path')
const webpack = require('webpack')

const mode = process.env.NODE_ENV || 'production'

module.exports = {
    output: {
        filename: `worker.${mode}.js`,
        path: path.join(__dirname, 'dist'),
    },
    mode,
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        plugins: [],
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            SOURCEHOST: 'img.domain.com',
            TARGETHOST: 'nextcloud.domain.com',
            NEXTCLOUDUSERNAME: 'username'
        })
    ],
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
            },
        }, ],
    },
}