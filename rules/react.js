/**
 * **Note**: As 'react' isn't installed locally, when running 'eslint' it warns;
 * `"react" package is not installed`. This won't be an issue when this package
 * is installed, so you can safely ignore it.
 */
module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },

  // Specific parser options otherwise when inheriting this config it'll error
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  extends: [
    // For more info: https://github.com/jsx-eslint/eslint-plugin-react#recommended
    "plugin:react/recommended",
  ],

  rules: {
    // Prevent 'forwardRef' etc from erroring
    "react/display-name": "off",

    // Suppress missing 'import React' in files error
    "react/react-in-jsx-scope": "off",
  },
};
