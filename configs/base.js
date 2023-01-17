module.exports = {
  // Specific parser options otherwise inheriting configs will not work
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  plugins: ["unused-imports", "simple-import-sort"],

  rules: {
    // Turn this on to automatically remove unused imports
    "unused-imports/no-unused-imports": "error",

    // Turn on exports ordering
    "simple-import-sort/exports": "error",

    // Turn on imports ordering with custom groups
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^react", "^@?\\w"],
          ["^_server"],
          ["^_utils"],
          ["^_contexts"],
          ["^_hooks"],
          ["^_components"],
          ["^_styles"],
          ["^\\."],
        ],
      },
    ],

    // Prevent 'forwardRef' etc from erroring
    "react/display-name": "off",
  },
};
