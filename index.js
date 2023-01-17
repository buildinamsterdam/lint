module.exports = {
  plugins: ["prettier", "unused-imports", "simple-import-sort"],

  extends: ["plugin:prettier/recommended"], // "next", "next/core-web-vitals",

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
