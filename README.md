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

We export two base ESLint configurations:

### @buildinams/lint

This is our default config for all React projects. It extends `react/recommended`, `prettier/recommended`, and adds a few additional rules to enforce consistency.

To use the shared eslint configuration, create an `.eslintrc.json` in your root project directory, and extend the config:

```json
{
  "extends": "./node_modules/@buildinams/lint"
}
```

### @buildinams/lint/next

This is our base configuration for all Next.js projects. It features the same config as `@buildinams/lint` par `react/recommended`, and instead replaces it with [Next.js](https://nextjs.org/) specific [rules](https://nextjs.org/docs/basic-features/eslint#eslint-plugin).

To use, create a `.eslintrc.json` and extend the config:

```json
{
  "extends": "./node_modules/@buildinams/lint/next"
}
```

## Rules

The idea behind this config is to enforce consistency across all projects. We've tried to keep the rules as minimal as possible, and for the most part simply inherit from the recommended rules of the plugins we use. The only exceptions are:

### [eslint-plugin-unused-imports](https://www.npmjs.com/package/eslint-plugin-unused-imports)

This is used to enforce that all imports are used in the file. This is useful to prevent unused imports from being committed to the repo.

### [eslint-plugin-simple-import-sort](https://www.npmjs.com/package/eslint-plugin-simple-import-sort)

This is used to enforce a consistent import order. The following order has been defined:

1. External modules (e.g. `react`, `next` and `@buildinams/`)
2. `_server` imports
3. `_utils` imports
4. `_contexts` imports
5. `_hooks` imports
6. `_components` imports
7. `_styles` imports
8. Internal modules (e.g. `./`)

## Using with Prettier

As you'll notice, this package doesn't contain any custom `.pretterrc.json` config to extend. We recommend not including it, and instead just inheriting the default config (by not creating / changing it).

## Requests and Contributing

Found an issue? Want a new feature? Get involved! Please contribute using our guideline [here](https://github.com/buildinamsterdam/lint/blob/main/CONTRIBUTING.md).

[npm-image]: https://img.shields.io/npm/v/@buildinams/lint.svg?style=flat-square&logo=react
[npm-url]: https://npmjs.org/package/@buildinams/lint
[ci-image]: https://github.com/buildinamsterdam/lint/actions/workflows/test.yml/badge.svg
[ci-url]: https://github.com/buildinamsterdam/lint/actions
[npm-downloads-image]: https://img.shields.io/npm/dm/@buildinams/lint.svg
[npm-downloads-url]: https://npmcharts.com/compare/@buildinams/lint?minimal=true
