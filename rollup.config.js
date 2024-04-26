const resolve = require("@rollup/plugin-node-resolve");
const babel = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const terser = require("@rollup/plugin-terser");

module.exports = [{
	input: "src/subscribe.js",
	plugins: [
		commonjs(),
		babel({
			exclude: ["node_modules/**"],
			babelHelpers: "bundled"
		}),
	],
	output: [
		{
			file: "dist/cjs.js",
			format: "cjs",
		},
		{
			file: "dist/esm.js",
			format: "es",
		},
	],
}, {
	input: "src/subscribe.js",
	plugins: [
		resolve(),
		commonjs(),
		babel({
			exclude: ["node_modules/**"],
			babelHelpers: "bundled"
		}),
	],
	output: [
		{
			name: "subscribe",
			file: "dist/umd.js",
			format: "umd",
			sourcemap: true,
		},
		{
			name: "subscribe",
			file: "dist/umd.min.js",
			format: "umd",
			sourcemap: true,
			plugins: [
				terser()
			]
		},
	],
}]
