module.exports = {
  plugins: ["prettier", "unused-imports", "simple-import-sort"],

  extends: ["next", "next/core-web-vitals", "plugin:prettier/recommended"],

  rules: {
    // Remove unused imports
    "unused-imports/no-unused-imports": "error",

    // Exports ordering
    "simple-import-sort/exports": "error",

    // Imports ordering
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^react", "^next", "^@?\\w"],
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
