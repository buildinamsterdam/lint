const reactPlugin = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const jsxA11y = require("eslint-plugin-jsx-a11y");

module.exports = [
	// Register .jsx so ESLint processes these files
	{ files: ["**/*.jsx"] },
	reactPlugin.configs.flat.recommended,
	reactPlugin.configs.flat["jsx-runtime"],
	reactHooks.configs["recommended-latest"],
	jsxA11y.flatConfigs.recommended,
	{
		// Fixed version avoids eslint-plugin-react's broken auto-detection
		// on ESLint 10 (getFilename removed). Override in your config if needed.
		settings: {
			react: {
				version: "19",
			},
		},

		rules: {
			// Prevent 'forwardRef' from erroring
			"react/display-name": "off",
			// Turn on imports ordering with custom groups
			"simple-import-sort/imports": [
				"error",
				{
					groups: [
						// Side-effect imports (e.g. "server-only", polyfills)
						["^\\u0000(?!.*\\.s?css$)"],
						// React, then external packages
						["^react", "^@?\\w"],
						// Absolute aliases (public, _, ~)
						["^public", "[_~].*"],
						// Relative imports (excluding styles)
						["^\\.(?!.*\\.s?css$)"],
						// Style imports (both side-effect and with specifiers)
						["\\.s?css$"],
					],
				},
			],
		},
	},
];
