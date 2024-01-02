module.exports = {
	extends: [
		"./configs/base.js",
		"./configs/react.js",
		"./configs/javascript.js",
		"./configs/prettier.js",
	].map(require.resolve),
};
