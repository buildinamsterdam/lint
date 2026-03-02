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
						// Match 'react', 'next' and external imports
						["^react", "^next", "^@?\\w"],
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
