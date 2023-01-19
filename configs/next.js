/** You should only extend this or `./react.js` in .eslintrc, not both. */
module.exports = {
  // Required to get Next.js to work with ESLint
  parser: "@babel/eslint-parser",

  // Full list: https://nextjs.org/docs/basic-features/eslint#eslint-plugin
  extends: ["next", "next/core-web-vitals"],

  rules: {
    // Prevent 'forwardRef' from erroring
    "react/display-name": "off",
  },
};
