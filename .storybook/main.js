// var path = require("path");

// const lessRegex = /\.less$/;
// const lessModuleRegex = /\.module\.less$/;

// console.log("path.appSrc", path.appSrc);
// common function to get style loaders
// const getStyleLoaders = (cssOptions, preProcessor) => {   const loaders = [
//   require.resolve('style-loader'),
//   {
//     loader: require.resolve('css-loader'),
//     options: cssOptions,
//   }

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
  ],
  // .storybook/main.js
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  // webpackFinal: async (config, { configType }) => {
  //   // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  //   // You can change the configuration based on that.
  //   // 'PRODUCTION' is used when building the static version of storybook.

  //   // Make whatever fine-grained changes you need
  //   config.module.rules.push({
  //     test: lessRegex,
  //     exclude: lessModuleRegex,
  //     use: ["style-loader", "css-loader", "sass-loader"],
  //     include: path.appSrc,
  //   });
  //   config.module.rules.push({
  //     test: lessModuleRegex,
  //     include: path.appSrc,
  //     loader: getStyleLoaders(
  //       {
  //         importLoaders: 2,
  //         sourceMap: shouldUseSourceMap,
  //         modules: {
  //           getLocalIdent: getCSSModuleLocalIdent,
  //         },
  //       },
  //       "less-loader",
  //       {
  //         javascriptEnabled: true,
  //       }
  //     ),
  //   });

  //   // Return the altered config
  //   return config;
  // },
};
