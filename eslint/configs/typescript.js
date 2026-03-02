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
		},
	},
];
