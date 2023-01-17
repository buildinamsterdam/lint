module.exports = {
  plugins: ["simple-import-sort"],

  rules: {
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
  },
};
