const base = require("./configs/base.js");
const react = require("./configs/react.js");
const next = require("./configs/next.js");
const javascript = require("./configs/javascript.js");
const prettier = require("./configs/prettier.js");

module.exports = [...base, ...react, ...next, ...javascript, ...prettier];
