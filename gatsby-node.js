const path = require('path');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
    const config = getConfig();

    config.module.rules.push({
        test: /\.glsl$/,
        use: [
            {
                loader: 'raw-loader',
                options: {
                    esModule: false,
                },
            },
        ],
    });

    config.module.rules.push({
        test: /\.worker\.ts$/,
        use: {
            loader: 'worker-loader',
        },
    });

    config.resolve.extensions.push('.glsl');
    config.resolve.alias = {
        ...config.resolve.alias,
        'https://cdn.jsdelivr.net/npm/@webgpu/glslang@0.0.15/dist/web-devel/glslang.js': path.resolve(__dirname, 'stub')
    };

    actions.setWebpackConfig({
        plugins: [
            new StaticSiteGeneratorPlugin({
                globals: {
                    window: {}
                }
            }),
        ],
    });
};