# lint

[![NPM version][npm-image]][npm-url]
[![Actions Status][ci-image]][ci-url]
[![PR Welcome][npm-downloads-image]][npm-downloads-url]

BiA's base lint config(s).

## Requirements

- **Node**: >=20.19.0
- **ESLint**: >=9.0.0
- **TypeScript**: >=5.1.0 (if using TypeScript configs)
- **React**: >=17.0.0 (if using React/Next configs)
- **Prettier**: >=3.0.0 (if using Prettier config)

This package uses ESLint [flat config](https://eslint.org/docs/latest/use/configure/configuration-files). You must use `eslint.config.js` (or `.mjs`/`.cjs`). Legacy `.eslintrc.*` files are not supported.

## Migrating from v0.4.x

v1.0.0 drops ESLint 8 and the legacy eslintrc format. If you're on ESLint 8, pin to `@buildinams/lint@0.4.x`.

To migrate:

1. Update to ESLint 10+ and Node 20+
2. Delete your `.eslintrc.*` file
3. Create `eslint.config.js` using the new flat config format (see below)

## Installation

```bash
npm i -D @buildinams/lint eslint
```

## Usage

This package exports six [ESLint](https://eslint.org/) configurations, one [Prettier](https://prettier.io) configuration, and one [Stylelint](https://stylelint.io/) configuration:

- `@buildinams/lint/eslint/javascript`
- `@buildinams/lint/eslint/typescript`
- `@buildinams/lint/eslint/react` (React + JavaScript)
- `@buildinams/lint/eslint/react-typescript`
- `@buildinams/lint/eslint/next` (Next.js + JavaScript)
- `@buildinams/lint/eslint/next-typescript`
- `@buildinams/lint/prettier`
- `@buildinams/lint/stylelint`

## ESLint

All ESLint configs export flat config arrays. Spread them into your `eslint.config.js`:

### React + JavaScript

```js
const reactConfig = require("@buildinams/lint/eslint/react");

module.exports = [...reactConfig];
```

### React + TypeScript

```js
const reactTsConfig = require("@buildinams/lint/eslint/react-typescript");

module.exports = [...reactTsConfig];
```

### Next.js + JavaScript

```js
const nextConfig = require("@buildinams/lint/eslint/next");

module.exports = [...nextConfig];
```

### Next.js + TypeScript

```js
const nextTsConfig = require("@buildinams/lint/eslint/next-typescript");

module.exports = [...nextTsConfig];
```

### JavaScript only

```js
const jsConfig = require("@buildinams/lint/eslint/javascript");

module.exports = [...jsConfig];
```

### TypeScript only

```js
const tsConfig = require("@buildinams/lint/eslint/typescript");

module.exports = [...tsConfig];
```

### Adding custom rules

Since these are flat config arrays, you can append your own config objects:

```js
const reactTsConfig = require("@buildinams/lint/eslint/react-typescript");

module.exports = [
	...reactTsConfig,
	{
		rules: {
			"no-console": "warn",
		},
	},
];
```

### Extended ESLint Rules

The idea behind this config is to enforce consistency across all projects. We've tried to keep the rules as minimal as possible, and for the most part simply inherit from the recommended rules of the plugins we use. **Note**: We've purposely only defined rules that are auto fixable, these rules should make it easier to write code, and not get in the way. With one TypeScript exception.

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
- [import/newline-after-import](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/newline-after-import.md) - Makes sure there's a newline after the imports.
- [import/no-duplicates](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md) - Merges import statements from the same file.

#### [@typescript-eslint/consistent-type-definitions](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)

Used to enforce `type` over `interface`, [the difference between interface and type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces) is minimal and the one additional feature it supports we shouldn't use.

#### no-restricted-syntax

- `TSEnumDeclaration` - Error when using Enums, let's push for `const Foo as const` since it's more declarative that it outputs JS. Enums are in a weird in between state that they are both types and constants. This makes them confusing on how to use them and what the output will be.

**Note**: The `TSEnumDeclaration` is our only rule that can't be auto-fixed by ESLint. This is because based on what we need the enum for the 'correct' approach might differ.

## Prettier

### @buildinams/lint/prettier

Our base prettier setup, it doesn't have any custom plugins at this point but we do modify two rules, explained below.

To use, create a `.prettierrc.js` in the root of your project and export the config from the package;

```js
module.exports = require("@buildinams/lint/prettier");
```

### Trailing comma; "all"

Keeps the trailing comma around wherever possible. Advantages; less changes in Git when adding a row, more flexible when changing the order of entries in; arrays, objects and function arguments. Alternative value: "es5", we have a compile step so we can write "future" JS in our source code without worries.

### Tabs

Tabs over spaces, spaces have a fixed width and tabs can be whatever the developer wants it to be using a custom `tabWidth` value.

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
	"extends": "@buildinams/lint/stylelint"
}
```

Lastly, this config also enforces `scss/function-no-unknown` to prevent the use of unknown functions. As you define functions in your project, we recommend you add them to the `ignoreFunctions` array in the config. For example:

```json
{
	"extends": "@buildinams/lint/stylelint",
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
		"source.fixAll.eslint": "explicit"
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
	"editor.codeActionsOnSave": {
		"source.fixAll.stylelint": "explicit"
	}
}
```

## Requests and Contributing

Found an issue? Want a new feature? Get involved! Please contribute using our guideline [here](https://github.com/buildinamsterdam/lint/blob/main/CONTRIBUTING.md).

[npm-image]: https://img.shields.io/npm/v/@buildinams/lint.svg?style=flat-square&logo=react
[npm-url]: https://npmjs.org/package/@buildinams/lint
[ci-image]: https://github.com/buildinamsterdam/lint/actions/workflows/lint.yml/badge.svg
[ci-url]: https://github.com/buildinamsterdam/lint/actions
[npm-downloads-image]: https://img.shields.io/npm/dm/@buildinams/lint.svg
[npm-downloads-url]: https://npmcharts.com/compare/@buildinams/lint?minimal=true
