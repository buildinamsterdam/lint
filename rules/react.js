/**
 * **Note**: As 'react' isn't installed locally, when running 'eslint' it warns;
 * "React version not specified in eslint-plugin-react settings.". This won't be
 * an issue when this package is installed, so you can safely ignore it.
 */
module.exports = {
  // For more info: https://github.com/jsx-eslint/eslint-plugin-react#recommended
  extends: ["plugin:react/recommended"],

  rules: {
    // Suppress missing 'import React' in files error
    "react/react-in-jsx-scope": "off",
  },
};
