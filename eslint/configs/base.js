const globals = require("globals");
const unusedImports = require("eslint-plugin-unused-imports");
const simpleImportSort = require("eslint-plugin-simple-import-sort");
const importPlugin = require("eslint-plugin-import-x");

module.exports = [
	{
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				...globals.browser,
				...globals.node,
				...globals.jest,
			},
		},

		plugins: {
			"unused-imports": unusedImports,
			"simple-import-sort": simpleImportSort,
			import: importPlugin,
		},

		rules: {
			// Remove unused imports
			"unused-imports/no-unused-imports": "error",

			// Prevent unused variables. Wraps `no-unused-vars` (the typescript-eslint
			// version when available, so type-only code is handled), but skips
			// imports so they're only reported once, by the rule above
			"unused-imports/no-unused-vars": "error",

			// Order exports
			"simple-import-sort/exports": "error",

			// Makes sure all imports are at the top of the file
			"import/first": "error",

			// Makes sure there's a newline after the imports
			"import/newline-after-import": "error",

			// Merge import statements of the same file
			"import/no-duplicates": "error",

			// Prevent 'console.log(...)' from being committed
			"no-console": ["error", { allow: ["warn", "error"] }],

			// Disallow the use of undeclared variables
			"no-undef": "error",
		},
	},
];
