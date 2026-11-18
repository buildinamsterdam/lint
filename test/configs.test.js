/**
 * Smoke tests for every published config. Each config is loaded through the
 * package's own `exports` map (self-reference), so a broken export path,
 * a missing plugin or an unknown rule fails here before it reaches npm.
 *
 * Code samples are inline strings linted with virtual file paths, so there
 * are no fixture files for the repo's own lint/prettier runs to trip over.
 * Formatting is checked against the repo's `.prettierrc.js` (tabs).
 */
const { describe, test } = require("node:test");
const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const os = require("node:os");
const path = require("node:path");
const { ESLint } = require("eslint");

const ROOT = path.join(__dirname, "..");

const ESLINT_CONFIGS = [
	"javascript",
	"typescript",
	"react",
	"react-typescript",
	"next",
	"next-typescript",
];

const isTs = (name) => name.endsWith("typescript");
const isReact = (name) => name.startsWith("react") || name.startsWith("next");
const isNext = (name) => name.startsWith("next");

const lint = async (config, code, fileName) => {
	const eslint = new ESLint({
		cwd: ROOT,
		overrideConfigFile: true,
		overrideConfig: config,
	});
	const [result] = await eslint.lintText(code, {
		filePath: path.join(ROOT, "test", fileName),
	});
	return result.messages;
};

const ruleIds = (messages) => new Set(messages.map((m) => m.ruleId));

const assertRules = (messages, expected) => {
	const found = ruleIds(messages);
	for (const rule of expected) {
		assert.ok(
			found.has(rule),
			`expected "${rule}" to fire, got: ${[...found].join(", ") || "nothing"}`,
		);
	}
};

const assertClean = (messages) => {
	assert.deepEqual(
		messages.map((m) => `${m.line}:${m.column} ${m.ruleId}: ${m.message}`),
		[],
	);
};

// Plain JS that every config must accept as-is
const CLEAN_JS = `import { join } from "node:path";

import { helper } from "./helper";

export const run = (value) => {
	const result = helper(join("a", value));
	console.warn(result);
	return result;
};
`;

// Hits the rules shared by every config (base + prettier)
const BASE_ERRORS = `import { a } from "./a";
import { unused } from "./b";
import { c } from "./a";
console.log(a, c);
export { z, y } from "./z";
const   spaced = 1;
export default spaced;
`;

// One of each kind of unused binding; the import must be reported only once
const UNUSED_VARS = `import { a, unusedImport } from "./a";

const unusedVar = 1;

export function f(used, unusedArg) {
	try {
		return a(used);
	} catch (err) {
		return null;
	}
}
`;

// Out-of-order imports, used to check `simple-import-sort/imports`
const UNSORTED_IMPORTS = `import { b } from "./b";
import { join } from "node:path";

export const x = join(b);
`;

describe("eslint configs", () => {
	for (const name of ESLINT_CONFIGS) {
		describe(name, () => {
			const load = () => require(`@buildinams/lint/eslint/${name}`);
			const ext = isTs(name) ? "ts" : "js";
			const jsxExt = isTs(name) ? "tsx" : "jsx";

			test("CJS and ESM entry points export the same flat config", async () => {
				const cjs = load();
				const { default: esm } = await import(
					`@buildinams/lint/eslint/${name}`
				);
				assert.ok(Array.isArray(cjs) && cjs.length > 0);
				assert.equal(esm, cjs);
			});

			test("accepts clean code", async () => {
				assertClean(await lint(load(), CLEAN_JS, `clean.${ext}`));
			});

			test("enforces base and prettier rules", async () => {
				const messages = await lint(load(), BASE_ERRORS, `base.${ext}`);
				assertRules(messages, [
					"no-console",
					"unused-imports/no-unused-imports",
					"import/no-duplicates",
					"simple-import-sort/exports",
					"prettier/prettier",
				]);
			});

			test("reports each unused variable once", async () => {
				const messages = await lint(load(), UNUSED_VARS, `unused.${ext}`);
				const unused = messages
					.filter((m) => m.ruleId?.startsWith("unused-imports/"))
					.map((m) => `${m.line}:${m.column} ${m.ruleId}`);
				assert.deepEqual(unused, [
					"1:13 unused-imports/no-unused-imports",
					"3:7 unused-imports/no-unused-vars",
					"5:25 unused-imports/no-unused-vars",
					"8:11 unused-imports/no-unused-vars",
				]);
			});

			// TS configs leave this to the compiler
			if (!isTs(name)) {
				test("reports undefined variables", async () => {
					const messages = await lint(
						load(),
						"export const x = notDefined;\n",
						`undef.${ext}`,
					);
					assertRules(messages, ["no-undef"]);
				});
			}

			// Known gap: import sorting is only configured in react/next.
			// Remove the `todo` once it moves into the base config.
			test(
				"sorts imports",
				{ todo: isReact(name) ? false : "not enabled outside react/next" },
				async () => {
					const messages = await lint(load(), UNSORTED_IMPORTS, `sort.${ext}`);
					assertRules(messages, ["simple-import-sort/imports"]);
				},
			);

			if (isTs(name)) {
				test("enforces typescript rules", async () => {
					const messages = await lint(
						load(),
						`interface Foo {\n\ta: number;\n}\n\nenum Bar {\n\tA,\n}\n\nexport const x = (a: Foo, b: Bar) => [a, b];\n`,
						"rules.ts",
					);
					assertRules(messages, [
						"@typescript-eslint/consistent-type-definitions",
						"no-restricted-syntax",
					]);
				});

				test("reports unused types and type parameters", async () => {
					const messages = await lint(
						load(),
						`type Unused = string;\n\nexport const id = <T, U>(x: T): T => x;\n`,
						"unused-types.ts",
					);
					const unused = messages
						.filter((m) => m.ruleId === "unused-imports/no-unused-vars")
						.map((m) => `${m.line}:${m.column}`);
					assert.deepEqual(unused, ["1:6", "3:23"]);
				});

				test("does not report global types as undefined", async () => {
					assertClean(
						await lint(
							load(),
							`export const timers: NodeJS.Timeout[] = [];\n`,
							"globals.ts",
						),
					);
				});
			}

			if (isReact(name)) {
				test("enforces react, hooks and a11y rules", async () => {
					const code = `import { useState } from "react";

export const List = ({ ok, items }) => {
	if (ok) {
		useState(0);
	}
	return (
		<ul>
			{items.map((item) => (
				<li>{item}</li>
			))}
			<img src="/a.png" />
		</ul>
	);
};
`;
					const messages = await lint(load(), code, `react.${jsxExt}`);
					assertRules(messages, [
						"react-hooks/rules-of-hooks",
						"react/jsx-key",
						"jsx-a11y/alt-text",
					]);
				});

				test("accepts JSX in .js files", async () => {
					const code = `export const A = () => <div />;\n`;
					assertClean(await lint(load(), code, "component.js"));
				});
			}

			if (isNext(name)) {
				test("enforces next rules", async () => {
					const code = `export const A = () => <img alt="" src="/a.png" />;\n`;
					const messages = await lint(load(), code, `next.${jsxExt}`);
					assertRules(messages, ["@next/next/no-img-element"]);
				});
			}
		});
	}
});

describe("npm package", () => {
	test("only ships the configs and every exported file", () => {
		const output = execFileSync(
			"npm",
			[
				"pack",
				"--dry-run",
				"--json",
				"--ignore-scripts",
				// Avoids failures from a broken or read-only global npm cache
				"--cache",
				path.join(os.tmpdir(), "buildinams-lint-npm-cache"),
			],
			{ cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
		);
		// npm 10 returns an array of packs, npm 11 an object keyed by name
		const json = JSON.parse(output);
		const [pack] = Array.isArray(json) ? json : Object.values(json);
		const files = pack.files.map((f) => f.path);

		const unexpected = files.filter(
			(file) =>
				!/^(eslint|prettier|stylelint)\//.test(file) &&
				!["LICENSE", "README.md", "package.json"].includes(file),
		);
		assert.deepEqual(unexpected, []);

		const { exports } = require("../package.json");
		const exported = Object.values(exports).flatMap((entry) =>
			Object.values(entry).map((file) => file.replace(/^\.\//, "")),
		);
		const missing = exported.filter((file) => !files.includes(file));
		assert.deepEqual(missing, []);
	});
});

describe("prettier config", () => {
	test("CJS and ESM entry points export the same options", async () => {
		const cjs = require("@buildinams/lint/prettier");
		const { default: esm } = await import("@buildinams/lint/prettier");
		assert.equal(esm, cjs);
		assert.equal(cjs.useTabs, true);
	});
});

describe("stylelint config", () => {
	const config = require("@buildinams/lint/stylelint");

	const lintCss = async (code) => {
		// stylelint's CommonJS API is deprecated, so load it as ESM
		const { default: stylelint } = await import("stylelint");
		const { results } = await stylelint.lint({
			code,
			codeFilename: path.join(ROOT, "test", "styles.module.scss"),
			config,
			configBasedir: ROOT,
		});
		const [result] = results;
		return [
			...result.warnings,
			...result.invalidOptionWarnings.map((w) => ({
				rule: "invalid-option",
				text: w.text,
			})),
			...result.parseErrors.map((e) => ({ rule: "parse-error", text: e.text })),
		];
	};

	test("CJS and ESM entry points export the same config", async () => {
		const { default: esm } = await import("@buildinams/lint/stylelint");
		assert.equal(esm, config);
	});

	// Also catches rules that no longer exist in the installed stylelint
	// version ("Unknown rule ..." is reported as a warning).
	test("accepts clean SCSS", async () => {
		const warnings = await lintCss(`.root {
	display: flex;
	color: red;

	&:hover {
		color: blue;
	}

	:global(.dark) & {
		color: white;
	}
}
`);
		assert.deepEqual(
			warnings.map((w) => `${w.rule}: ${w.text}`),
			[],
		);
	});

	test("enforces custom rules", async () => {
		const warnings = await lintCss(`.root {
	color: red;
	display: inline;
	width: 10px;

	& .child {
		color: blue;
	}
}
`);
		const rules = new Set(warnings.map((w) => w.rule));
		for (const rule of [
			"order/properties-order",
			"plugin/declaration-block-no-ignored-properties",
			"scss/selector-no-redundant-nesting-selector",
		]) {
			assert.ok(
				rules.has(rule),
				`expected "${rule}", got: ${[...rules].join(", ")}`,
			);
		}
	});
});
