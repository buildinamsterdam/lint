module.exports = {
  // Define target environments. Note: Without these some rules will throw
  // errors because they don't know what globals are available
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },

  plugins: ["unused-imports", "simple-import-sort", "import"],

  rules: {
    // Remove unused imports
    "unused-imports/no-unused-imports": "warn",

    // Order exports
    "simple-import-sort/exports": "warn",

    // Makes sure all imports are at the top of the file
    "import/first": "warn",

    // Makes sure there's a newline after the imports
    "import/newline-after-import": "warn",

    // Merge import statements of the same file
    "import/no-duplicates": "warn",

    // Prevent 'console.log(...)' from being committed
    "no-console": ["warn", { allow: ["warn", "error"] }],

    // Disallow the use of undeclared variables
    "no-undef": "warn",
  },
};
