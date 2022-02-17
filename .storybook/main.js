var path = require('path');

const getCacheIdentifier = require('react-dev-utils/getCacheIdentifier');

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }

  try {
    require.resolve('react/jsx-runtime');

    return true;
  } catch (e) {
    return false;
  }
})();

module.exports = {
  staticDirs: ['../public'],
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
        transcludeMarkdown: true,
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  // .storybook/main.js
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
    }
  },
  features: {
    postcss: false
  },
  webpackFinal: async config => {
    // config.module.rules.push({
    //   test: /\.module\.less$/,
    //   use: [
    //     'style-loader',
    //     {
    //       loader: 'typings-for-css-modules-loader',
    //       options: {
    //         modules: true,
    //         namedExport: true,
    //         camelCase: true,
    //         // minimize: true,
    //         localIdentName: '[local]_[hash:base64:5]',
    //       },
    //     },
    //     'less-loader',
    //   ],
    // });
    config.module.rules.push({
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    });
    return config;
  },
  core: {
    builder: 'webpack5',
  },
};
