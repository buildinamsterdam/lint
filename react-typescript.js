module.exports = {
  extends: [
    "./configs/base.js",
    "./configs/react.js",
    "./configs/typescript.js",

    // TODO(Paulo): Do we need prettier here? Or even on any of the configs?
    "./configs/prettier.js",
  ].map(require.resolve),
};
