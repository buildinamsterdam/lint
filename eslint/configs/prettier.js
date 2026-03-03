/**
 * This turns off all rules that are unnecessary or might conflict with Prettier
 * so that we can define our own. For more info: https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
 */
const prettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = [prettierRecommended];
