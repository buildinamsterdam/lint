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
      "error",
      {
        groups: [
          // Match 'react', 'next' and all imports that don't match the others
          ["^react", "^next", "^[^_./]"],
          // Match 'public' and all imports that begin with '_'
          ["^public/", "^_"],
          // Match all relative imports that begin with '.'
          ["^\\."],
        ],
      },
    ],
  },
};
