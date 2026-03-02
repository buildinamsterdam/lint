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
				version: "18",
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
						// Match 'react' and external imports
						["^react", "^@?\\w"],
						// Match 'public' and all absolute imports that begin with '_' or '~'
						["^public", "[_~].*"],
						// Match all relative imports that begin with '.'
						["^\\."],
					],
				},
			],
		},
	},
];
