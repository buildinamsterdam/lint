# lint

[![NPM version][npm-image]][npm-url]
[![Actions Status][ci-image]][ci-url]
[![PR Welcome][npm-downloads-image]][npm-downloads-url]

BiA's base lint config(s).

## Requirements

- **Node** >=20.19.0 | **ESLint** >=9.0.0
- **TypeScript** >=5.1.0, **React** >=17.0.0, **Prettier** >=3.0.0, **Stylelint** >=16.0.0 — as needed

Uses ESLint [flat config](https://eslint.org/docs/latest/use/configure/configuration-files). Legacy `.eslintrc.*` is not supported.

## Installation

```bash
npm i -D @buildinams/lint eslint prettier stylelint
```

Drop `prettier` and/or `stylelint` if you don't need them.

## ESLint

| Config | Export path |
|---|---|
| JavaScript | `@buildinams/lint/eslint/javascript` |
| TypeScript | `@buildinams/lint/eslint/typescript` |
| React | `@buildinams/lint/eslint/react` |
| React + TypeScript | `@buildinams/lint/eslint/react-typescript` |
| Next.js | `@buildinams/lint/eslint/next` |
| Next.js + TypeScript | `@buildinams/lint/eslint/next-typescript` |

```js
// eslint.config.mjs
import config from "@buildinams/lint/eslint/next-typescript";
import { globalIgnores } from "eslint/config";

export default [
	...config,
	globalIgnores([".next/**", "out/**", "build/**"]),
];
```

<details>
<summary>CJS</summary>

```js
// eslint.config.js
module.exports = [...require("@buildinams/lint/eslint/next-typescript")];
```
</details>

### Bundled plugins

unused-imports, simple-import-sort, [import-x](https://github.com/un-ts/eslint-plugin-import-x), [prettier](https://www.npmjs.com/package/eslint-plugin-prettier) (formatting errors as lint errors), react + react-hooks + jsx-a11y (React/Next), [@next/eslint-plugin-next](https://www.npmjs.com/package/@next/eslint-plugin-next) (Next), [typescript-eslint](https://typescript-eslint.io/) (TS).

### Custom rules

- **Import order**: externals → absolute (`_`, `~` prefixed) → relative
- **`type` over `interface`** via `consistent-type-definitions`
- **No enums** — use `as const` instead (only non-auto-fixable rule)
- **No `console.log`** — `warn` and `error` allowed

## Prettier

```js
// .prettierrc.mjs
export { default } from "@buildinams/lint/prettier";
```

Trailing commas `"all"` | Tabs | Double quotes

Formatting errors also surface as ESLint errors via `eslint-plugin-prettier`.

## Stylelint

```json
// .stylelintrc.json
{
	"extends": "@buildinams/lint/stylelint"
}
```

Extends: [standard-scss](https://www.npmjs.com/package/stylelint-config-standard-scss), [css-modules](https://www.npmjs.com/package/stylelint-config-css-modules), [recess-order](https://www.npmjs.com/package/stylelint-config-recess-order), [stylelint-prettier](https://www.npmjs.com/package/stylelint-prettier). Enables `scss/selector-no-redundant-nesting-selector`.

<details>
<summary>Custom SCSS functions</summary>

```json
{
	"extends": "@buildinams/lint/stylelint",
	"rules": {
		"scss/function-no-unknown": [true, { "ignoreFunctions": ["px-to-rem"] }]
	}
}
```
</details>

## VSCode

Extensions: [vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

```json
// .vscode/settings.json
{
	"editor.formatOnSave": false,
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": "explicit",
		"source.fixAll.stylelint": "explicit"
	},
	"scss.validate": false,
	"stylelint.validate": ["scss"]
}
```

## Migrating from v0.4.x

1. Update to ESLint 9+ and Node 20+
2. Delete `.eslintrc.*`
3. Create `eslint.config.mjs` (see above)

Pin `@buildinams/lint@0.4.x` if staying on ESLint 8.

## Contributing

Found an issue? Want a new feature? [Get involved](https://github.com/buildinamsterdam/lint/blob/main/CONTRIBUTING.md).

[npm-image]: https://img.shields.io/npm/v/@buildinams/lint.svg?style=flat-square&logo=react
[npm-url]: https://npmjs.org/package/@buildinams/lint
[ci-image]: https://github.com/buildinamsterdam/lint/actions/workflows/lint.yml/badge.svg
[ci-url]: https://github.com/buildinamsterdam/lint/actions
[npm-downloads-image]: https://img.shields.io/npm/dm/@buildinams/lint.svg
[npm-downloads-url]: https://npmcharts.com/compare/@buildinams/lint?minimal=true
