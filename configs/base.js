module.exports = {
  // Define target environments. Note: Without these some rules will throw
  // errors because they don't know what globals are available
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
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
          // Match 'react' and all imports that don't match the other groups
          ["^react", "^[^_./]"],
          // Match 'public' and all imports that begin with '_'
          ["^public/", "^_"],
          // Match all relative imports that begin with '.'
          ["^\\."],
        ],
      },
    ],

    // Prevent 'console.log(...)' from being committed
    "no-console": ["error", { allow: ["warn", "error"] }],

    // Disallow the use of undeclared variables
    "no-undef": "error",
  },
};
