module.exports = {
  extends: [
    "./configs/base.js",
    "./configs/react.js",
    "./configs/typescript.js",
    "./configs/prettier.js",
  ].map(require.resolve),
};
