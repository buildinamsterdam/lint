module.exports = {
  // Hide warnings about missing React version not being specified
  settings: {
    react: {
      version: "detect",
    },
  },

  // Required to get React.js to work with these configs
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  extends: [
    // Full list: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/configs/recommended.js
    "plugin:react/recommended",

    // For more info: https://www.npmjs.com/package/eslint-plugin-react-hooks
    "plugin:react-hooks/recommended",

    // Full list: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/src/index.js
    "plugin:jsx-a11y/recommended",
  ],

  rules: {
    // Prevent 'forwardRef' from erroring
    "react/display-name": "off",

    // Suppress missing 'import React' in files error
    "react/react-in-jsx-scope": "off",
  },
};
