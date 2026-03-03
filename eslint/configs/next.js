const nextPlugin = require("@next/eslint-plugin-next");

module.exports = [
	nextPlugin.configs["core-web-vitals"],
	{
		rules: {
			// Turn on imports ordering with custom groups
			"simple-import-sort/imports": [
				"error",
				{
					groups: [
						// Side-effect imports (e.g. "server-only", polyfills)
						["^\\u0000(?!.*\\.s?css$)"],
						// React, Next, then external packages
						["^react", "^next", "^@?\\w"],
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
