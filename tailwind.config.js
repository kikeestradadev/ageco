/** @type {import('tailwindcss').Config} */
/**
 * Tailwind CSS 4 — la fuente de verdad del design system está en
 * `src/styles/styles.css` (`@theme` + `:root`): ageco-red, sigo-green, etc.
 * Este archivo solo mantiene content paths por compatibilidad del tooling.
 */
export default {
	content: ['./src/pug/**/*.pug', './src/js/**/*.js'],
	theme: {
		extend: {},
	},
	plugins: [],
};
