module.exports = {
  extends: [
    // Base rules. Note: This installs and uses 'postcss-scs' out of the box
    "stylelint-config-standard-scss",

    // CSS modules syntax support
    "stylelint-config-css-modules",

    // Enforce a logical order for CSS properties
    "stylelint-config-rational-order",
  ],

  plugins: [
    // Block ignored properties in CSS
    "stylelint-declaration-block-no-ignored-properties",
  ],

  rules: {
    // Enable plugin
    "plugin/declaration-block-no-ignored-properties": true,

    // Don't include flex properties in the redundant longhand properties rule
    "declaration-block-no-redundant-longhand-properties": [
      true,
      { ignoreShorthands: ["/flex/"] },
    ],

    // Prevent redundant nesting selectors
    "scss/selector-no-redundant-nesting-selector": true,

    // Force tab based indentation
    indentation: "tab",
  },
};
