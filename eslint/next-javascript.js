module.exports = {
	extends: [
		"./configs/base.js",
		"./configs/next.js",
		"./configs/javascript.js",
		"./configs/prettier.js",
	].map(require.resolve),
};
