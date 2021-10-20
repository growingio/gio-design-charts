module.exports = {
  presets: [['@babel/env', { targets: { esmodules: true } }], '@babel/react', '@babel/typescript'],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/transform-runtime',
    [
      'formatjs',
      {
        idInterpolationPattern: '[sha512:contenthash:base64:6]',
        extractFromFormatMessageCall: true,
        ast: true,
      },
    ],
  ],
};
