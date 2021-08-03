export default {
  cjs: 'babel',
  entry: 'src/index.ts',
  esm: 'babel',
  file: 'utils',
  umd: {
    globals: {
      react: 'React',
    },
    minFile: true,
    sourcemap: true,
  },
  runtimeHelpers: true,
};
