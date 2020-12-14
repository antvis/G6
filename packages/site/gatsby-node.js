const path = require('path');

exports.onCreateWebpackConfig = ({ getConfig }) => {
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
};
