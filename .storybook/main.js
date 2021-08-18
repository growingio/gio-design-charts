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
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
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
    {
      name: '@storybook/preset-create-react-app',
      options: {
        // fixed can't parse less file issue
        // https://github.com/storybookjs/storybook/issues/9796#issuecomment-638091704
        craOverrides: {
          fileLoaderExcludes: ['less'],
        },
      },
    },
  ],
  // .storybook/main.js
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  features: {
    postcss: false,
  },
  webpackFinal: async (config) => {
    const isProduction = config.mode === 'production';
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
      use: ['style-loader', 'css-loader', 'less-loader'],
    });
    config.module.rules.push({
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      include: [
        path.join(__dirname, '../stories'),
        path.join(__dirname, '../src'),
        path.join(__dirname, '../.storybook'),
      ],
      use: {
        loader: 'babel-loader',
        options: {
          customize: require.resolve('babel-preset-react-app/webpack-overrides'),
          presets: [
            [
              require.resolve('babel-preset-react-app'),
              {
                runtime: hasJsxRuntime ? 'automatic' : 'classic',
              },
            ],
          ],
          // @remove-on-eject-begin
          babelrc: false,
          configFile: false,
          // Make sure we have a unique cache identifier, erring on the
          // side of caution.
          // We remove this when the user ejects because the default
          // is sane and uses Babel options. Instead of options, we use
          // the react-scripts and babel-preset-react-app versions.
          cacheIdentifier: getCacheIdentifier(isProduction ? 'production' : 'development', [
            'babel-plugin-named-asset-import',
            'babel-preset-react-app',
            'react-dev-utils',
            'react-scripts',
          ]),
          // @remove-on-eject-end
          plugins: [
            [
              require.resolve('babel-plugin-named-asset-import'),
              {
                loaderMap: {
                  svg: {
                    ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                  },
                },
              },
            ],
          ].filter(Boolean),
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          // See #6846 for context on why cacheCompression is disabled
          cacheCompression: false,
          compact: isProduction,
        },
      },
    });
    return config;
  },
};
