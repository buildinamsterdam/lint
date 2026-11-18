const tseslint = require("typescript-eslint");

module.exports = [
	...tseslint.configs.recommended,
	{
		rules: {
			"no-restricted-syntax": [
				"error",
				{
					selector: "TSEnumDeclaration",
					message: "Use `const Foo as const` with `typeof Foo` over Enum",
				},
			],
			"@typescript-eslint/consistent-type-definitions": ["error", "type"],
			// Replaced by `unused-imports/no-unused-vars` in the base config
			"@typescript-eslint/no-unused-vars": "off",
		},
	},
	{
		// TS compiler handles undefined variables — no-undef false-positives
		// on global types (JSX.Element, NodeJS.Timeout, etc.)
		files: ["**/*.{ts,tsx,mts,cts}"],
		rules: { "no-undef": "off" },
	},
];
