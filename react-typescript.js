module.exports = {
  extends: [
    "./rules/base.js",
    "./rules/react.js",
    "./rules/typescript.js",

    // TODO(Paulo): Do we need prettier here? Or even on any of the configs?
    "./rules/prettier.js",
  ].map(require.resolve),
};
