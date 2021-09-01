module.exports = {
    presets: ['@babel/preset-react', ['@babel/preset-env'], '@babel/preset-typescript'],
    plugins: [
    //   ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-modules-commonjs',
      ['@babel/transform-runtime', {
        "absoluteRuntime": false,
        "corejs": false,
        "helpers": false,
        // "polyfill": false,
        "regenerator": true,
      }],
    ],
  };
  