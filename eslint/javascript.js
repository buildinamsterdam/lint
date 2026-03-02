const base = require("./configs/base.js");
const javascript = require("./configs/javascript.js");
const prettier = require("./configs/prettier.js");

module.exports = [...base, ...javascript, ...prettier];
