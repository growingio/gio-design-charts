module.exports = {
  presets: [['@babel/env', { targets: { esmodules: true } }], '@babel/react', '@babel/flow', '@babel/typescript'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-transform-runtime',
  ],
};
