module.exports = {
  extends: [
    "./configs/base.js",
    "./configs/next.js",
    "./configs/typescript.js",
    "./configs/prettier.js",
  ].map(require.resolve),
};
