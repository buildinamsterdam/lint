const base = require("./configs/base.js");
const react = require("./configs/react.js");
const javascript = require("./configs/javascript.js");
const prettier = require("./configs/prettier.js");

module.exports = [...base, ...react, ...javascript, ...prettier];
