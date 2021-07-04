import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import marko from "@marko/rollup";
import postcss from "rollup-plugin-postcss";

export default {
	input: 'src/exports.js',
	output: {
    file: 'dist/bundle.js',
    format: 'cjs'
	},
  plugins: [
    marko.browser(),
    nodeResolve({
      browser: true,
      extensions: [".js", ".marko"]
    }),
    // If using `style` blocks with Marko you must use an appropriate plugin.
    postcss({
      external: true
    }),
    // NOTE: The Marko runtime uses commonjs so this plugin is also required.
    commonjs({
      extensions: [".js", ".marko"]
    }),
  ]
};
