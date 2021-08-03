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
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
        transcludeMarkdown: true,
      },
    },
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
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.less$/,
      use: ["style-loader", "css-loader", "less-loader"],
    });
    return config;
  },
};
