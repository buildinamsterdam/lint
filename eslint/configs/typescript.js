module.exports = {
  // Support TypeScript files
  parser: "@typescript-eslint/parser",

  // Full list: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
  extends: ["plugin:@typescript-eslint/recommended"],

  rules: {
    "no-restricted-syntax": [
      "error",
      {
        selector: "TSEnumDeclaration",
        message: "Use `const Foo as const` with `typeof Foo` over Enum",
      },
    ],
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  },
};
