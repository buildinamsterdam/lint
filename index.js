module.exports = {
  extends: [
    "./rules/unused-imports.js",
    "./rules/order.js",
    "./rules/react.js",
    "./rules/prettier.js",
  ].map(require.resolve),
};
