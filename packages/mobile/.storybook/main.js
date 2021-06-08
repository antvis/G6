module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('awesome-typescript-loader'),
    });

    config.module.rules.push(
      {
        test: /\.stories\.tsx?$/,

        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        enforce: 'pre',

        exclude: /node_modules | tests/,
      },

    );

    config.resolve.extensions.push('.ts', '.tsx', '.js');

    // Return the altered config
    return config;
  }
}
