const base = require("./configs/base.js");
const typescript = require("./configs/typescript.js");
const prettier = require("./configs/prettier.js");

module.exports = [...base, ...typescript, ...prettier];
