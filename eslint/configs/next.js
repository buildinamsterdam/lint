/** You should only extend this or `./react.js` in .eslintrc, not both. */
module.exports = {
  // Required to get Next.js to work with ESLint
  parser: "@babel/eslint-parser",

  // Full list: https://nextjs.org/docs/basic-features/eslint#eslint-plugin
  extends: ["next", "next/core-web-vitals"],

  rules: {
    // Prevent 'forwardRef' from erroring
    "react/display-name": "off",

    // Turn on imports ordering with custom groups
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          // Match 'react', 'next' and external imports
          ["^react", "^next", "^@?\\w"],
          // Match 'public' and all absolute imports that begin with '_' or '~'
          ["^public", "[_~].*"],
          // Match all relative imports that begin with '.'
          ["^\\."],
        ],
      },
    ],
  },
};
