# lint

[![NPM version][npm-image]][npm-url]
[![Actions Status][ci-image]][ci-url]
[![PR Welcome][npm-downloads-image]][npm-downloads-url]

BiA's base lint config(s).

## Installation

Install this package with `npm`.

```bash
npm i -D @buildinams/lint
```

## Usage

We export three base ESLint configurations for:

- React.js JavaScript (default)
- Next.js JavaScript (lint/next)
- React.js TypeScript (lint/react-typescript)
- Next.js TypeScript (lint/next-typescript)

### @buildinams/lint

This is our default config for all React projects. It extends:

- `react/recommended`
- `react-hooks/recommended`
- `jsx-a11y/recommended`
- `prettier/recommended`

To use the shared eslint configuration, create an `.eslintrc.json` in your root project directory, and extend the config:

```json
{
  "extends": "./node_modules/@buildinams/lint"
}
```

### @buildinams/lint/react-typescript

This extends our base React config with parsing / linting support for TypeScript from [@typescript-eslint/recommended](https://typescript-eslint.io/linting/configs/#recommended).

To use, create a `.eslintrc.json` and extend the config:

```json
{
  "extends": "./node_modules/@buildinams/lint/react-typescript"
}
```

### @buildinams/lint/next

This is our base configuration for all Next.js projects. It extends:

- `next`
- `next/core-web-vitals`

To use, create a `.eslintrc.json` and extend the config:

```json
{
  "extends": "./node_modules/@buildinams/lint/next"
}
```

### @buildinams/lint/next-typescript

This extends our base Next config with parsing / linting support for TypeScript from [@typescript-eslint/recommended](https://typescript-eslint.io/linting/configs/#recommended).

To use, create a `.eslintrc.json` and extend the config:

```json
{
  "extends": "./node_modules/@buildinams/lint/next-typescript"
}
```

## Rules

The idea behind this config is to enforce consistency across all projects. We've tried to keep the rules as minimal as possible, and for the most part simply inherit from the recommended rules of the plugins we use. The main exceptions are when it comes to imports. **Note**: We've purposely only defined rules that are auto fixable, these rules should make it easier to write code, and not get in the way.

### [eslint-plugin-unused-imports](https://www.npmjs.com/package/eslint-plugin-unused-imports)

This is used to enforce that all imports are used in the file. This is used to prevent unused imports from being committed to the repo.

### [eslint-plugin-simple-import-sort](https://www.npmjs.com/package/eslint-plugin-simple-import-sort)

This is used to enforce a consistent import order. The following order has been defined:

1. External modules (e.g. `react`, `next` and `@buildinams/`)
2. Absolute imports (supports prefix of `_` and `~` e.g. `public/`, `_components` and `~/contexts`)
3. Relative imports (e.g. `../` and `./`)

**Note**: The biggest thing we enforce here is the use of prefixes (either `_` or `~`) for absolute imports. This is to make it clear that these are not external modules, and to make it easier to distinguish between the different modules when enforcing the import order.

### [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)

This is used to auto fix some common inconsistencies. The following rules have been enabled:

- [import/first](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md) - Makes sure all imports are at the top of the file.
- [import/newline-after-import](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/newline-after-import.md) - Makes sure there’s a newline after the imports.
- [import/no-duplicates](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md) - Merges import statements from the same file.

## Using With Prettier

As you'll notice, this package doesn't contain any custom `.pretterrc.json` config to extend. We recommend not including it, and instead just inheriting the default config (by not creating / changing it).

## Enabling ESLint on Save in VSCode

To use ESLint on save, you'll need to install the [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension.

To then enable format on save in VScode, open your workspace settings (`Shift-Command-P` and select `Open Workspace Settings (JSON)`), then paste the following into `/.vscode/settings.json`:

```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Requirements

This library requires a minimum React version of `17.0.0`.

## Requests and Contributing

Found an issue? Want a new feature? Get involved! Please contribute using our guideline [here](https://github.com/buildinamsterdam/lint/blob/main/CONTRIBUTING.md).

[npm-image]: https://img.shields.io/npm/v/@buildinams/lint.svg?style=flat-square&logo=react
[npm-url]: https://npmjs.org/package/@buildinams/lint
[ci-image]: https://github.com/buildinamsterdam/lint/actions/workflows/lint.yml/badge.svg
[ci-url]: https://github.com/buildinamsterdam/lint/actions
[npm-downloads-image]: https://img.shields.io/npm/dm/@buildinams/lint.svg
[npm-downloads-url]: https://npmcharts.com/compare/@buildinams/lint?minimal=true
