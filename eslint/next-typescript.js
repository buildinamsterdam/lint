const base = require("./configs/base.js");
const react = require("./configs/react.js");
const next = require("./configs/next.js");
const typescript = require("./configs/typescript.js");
const prettier = require("./configs/prettier.js");

module.exports = [...base, ...react, ...next, ...typescript, ...prettier];
