const resolve = require('path').resolve;

module.exports = ({ config }) => {
  
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader'),
  });

  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    // loaders: [
    //   {
    //     loader: require.resolve('@storybook/addon-storysource/loader'),
    //     options: { parser: 'typescript' },
    //   },
    // ],
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
    enforce: 'pre',
    // include: [
    //   path.resolve(__dirname, "./src"),
    //   path.resolve(__dirname, "./demos")
    // ],
    exclude: /node_modules | tests/
  },
  // {
  //   test: /\.stories\.css?$/,
  //   use: ['style-loader', 'css-loader'],
  // },
  );

  config.resolve.extensions.push('.ts', '.tsx', '.js');

  config.resolve.alias = {
    '@g6/types': resolve(process.cwd(), './types'),
    '@g6': resolve(process.cwd(), './src')
  }

  return config;
};
