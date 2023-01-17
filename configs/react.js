module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },

  extends: [
    // For more info: https://github.com/jsx-eslint/eslint-plugin-react#recommended
    "plugin:react/recommended",
  ],

  rules: {
    // Suppress missing 'import React' in files error
    "react/react-in-jsx-scope": "off",
  },
};
