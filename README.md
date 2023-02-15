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

This package export four base [ESLint](https://eslint.org/) and one base [Stylelint](https://stylelint.io/) configuration:

- React.js JavaScript (default)
- Next.js JavaScript (lint/next)
- React.js TypeScript (lint/react-typescript)
- Next.js TypeScript (lint/next-typescript)
- SCSS with CSS Modules (default)

## ESLint

### @buildinams/lint/eslint

This is our base config for all React projects. It extends:

- [react/recommended](https://www.npmjs.com/package/eslint-plugin-react)
- [react-hooks/recommended](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [jsx-a11y/recommended](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)
- [prettier/recommended](https://www.npmjs.com/package/eslint-config-prettier)

To use the shared eslint configuration, create an `.eslintrc.json` in your root project directory, and extend the config:

```json
{
  "extends": "./node_modules/@buildinams/lint/eslint/react"
}
```

### @buildinams/lint/eslint/react-typescript

This extends our base React config with parsing / linting support for TypeScript from [@typescript-eslint/recommended](https://typescript-eslint.io/linting/configs/#recommended).

To use, create a `.eslintrc.json` and extend the config:

```json
{
  "extends": "./node_modules/@buildinams/lint/eslint/react-typescript"
}
```

### @buildinams/lint/eslint/next

This is our base configuration for all Next.js projects. It extends:

- [next](https://www.npmjs.com/package/eslint-config-next)
- [next/core-web-vitals](https://www.npmjs.com/package/@next/eslint-plugin-next)

To use, create a `.eslintrc.json` and extend the config:

```json
{
  "extends": "./node_modules/@buildinams/lint/eslint/next"
}
```

### @buildinams/lint/eslint/next-typescript

This extends our base Next config with parsing / linting support for TypeScript from [@typescript-eslint/recommended](https://typescript-eslint.io/linting/configs/#recommended).

To use, create a `.eslintrc.json` and extend the config:

```json
{
  "extends": "./node_modules/@buildinams/lint/eslint/next-typescript"
}
```

### Extended ESLint Rules

The idea behind this config is to enforce consistency across all projects. We've tried to keep the rules as minimal as possible, and for the most part simply inherit from the recommended rules of the plugins we use. The main exceptions are when it comes to the following. **Note**: We've purposely only defined rules that are auto fixable, these rules should make it easier to write code, and not get in the way.

#### [eslint-plugin-unused-imports](https://www.npmjs.com/package/eslint-plugin-unused-imports)

This is used to enforce that all imports are used in the file. This is used to prevent unused imports from being committed to the repo.

#### [eslint-plugin-simple-import-sort](https://www.npmjs.com/package/eslint-plugin-simple-import-sort)

This is used to enforce a consistent import order. The following order has been defined:

1. External modules (e.g. `react`, `next` and `@buildinams/`)
2. Absolute imports (supports prefix of `_` and `~` e.g. `public/`, `_components` and `~/contexts`)
3. Relative imports (e.g. `../` and `./`)

**Note**: The biggest thing we enforce here is the use of prefixes (either `_` or `~`) for absolute imports. This is to make it clear that these are not external modules, and to make it easier to distinguish between the different modules when enforcing the import order.

#### [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)

This is used to auto fix some common inconsistencies. The following rules have been enabled:

- [import/first](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md) - Makes sure all imports are at the top of the file.
- [import/newline-after-import](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/newline-after-import.md) - Makes sure there’s a newline after the imports.
- [import/no-duplicates](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md) - Merges import statements from the same file.

### Quotes

We enforce the use of "double quotes" when possible. We defined this with the intent of it being applied as a auto-fixable rule to enforce consistency with [prettier](https://prettier.io/docs/en/rationale.html#strings).

## Stylelint

### @buildinams/lint/stylelint

This is our base config for all SCSS projects with CSS Modules. It extends:

- [stylelint-config-recommended-scss](https://www.npmjs.com/package/stylelint-config-recommended-scss)
- [stylelint-config-css-modules](https://www.npmjs.com/package/stylelint-config-css-modules)
- [stylelint-config-rational-order](https://www.npmjs.com/package/stylelint-config-rational-order)
- [stylelint-declaration-block-no-ignored-properties](https://www.npmjs.com/package/stylelint-declaration-block-no-ignored-properties)

For the most part we've tried to simply inherit rules from the above configs, but we've also added a few custom rules:

- [scss/selector-no-redundant-nesting-selector](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/selector-no-redundant-nesting-selector/README.md)
- [indentation](https://stylelint.io/user-guide/rules/indentation/) - Enforced `tab` spacings.

To use, create a `.stylelintrc.json` and extend the config:

```json
{
  "extends": "./node_modules/@buildinams/lint/stylelint"
}
```

Lastly, this config also enforces `scss/function-no-unknown` to prevent the use of unknown functions. As you define functions in your project, we recommend you add them to the `ignoreFunctions` array in the config. For example:

```json
{
  "extends": "./node_modules/@buildinams/lint/stylelint",
  "rules": {
    "scss/function-no-unknown": [true, { "ignoreFunctions": ["px-to-rem"] }]
  }
}
```

This adds a level of type safety to your SCSS, and prevents developers from using functions that don't 'exist'.

### Using 'tab' Spacings

Different developers have different preferences when it comes down to spacing sizes. To make sure everyone can have what they want visually, we've decided to enforce tabs over spaces. This means one developer can have tabs render as `4` spaces and another as `2` spaces without it effecting the codebase.

## Using With Prettier

As you'll notice, this package doesn't contain any custom `.pretterrc.json` config to extend. We recommend not including it, and instead just inheriting the default config (by not creating / changing it).

## Enabling Prettier on Save in VSCode

To use Prettier on save, you'll need to install the following VSCode extensions:

- [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

To then enable format on save in VScode, open your workspace settings (`Shift-Command-P` and select `Open Workspace Settings (JSON)`), then paste the following into `/.vscode/settings.json`:

```json
{
  "editor.formatOnSave": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Enabling Stylelint on Save in VSCode

To use Stylelint on save, you'll need to install the [stylelint.vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) extension.

To then enable format on save in VScode, open your workspace settings (see above for how to open workspace settings), then paste the following into `/.vscode/settings.json`:

```json
{
  "editor.formatOnSave": false,
  "scss.validate": false,
  "stylelint.validate": ["scss"],
  "[scss]": {
    "editor.defaultFormatter": "stylelint.vscode-stylelint"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
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
