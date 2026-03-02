const base = require("./configs/base.js");
const react = require("./configs/react.js");
const typescript = require("./configs/typescript.js");
const prettier = require("./configs/prettier.js");

module.exports = [...base, ...react, ...typescript, ...prettier];
