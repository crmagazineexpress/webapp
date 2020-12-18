module.exports = {
	env: {
		browser: true,
	},
	extends: [
		'prettier',
		'plugin:prettier/recommended',
		'plugin:vue/essential',
	],
	parserOptions: {
		ecmaVersion: 12,
		parser: 'babel-eslint',
		sourceType: 'module',
	},
	plugins: ['vue', '@typescript-eslint'],
	rules: {
		'prettier/prettier': 'error',
		'brace-style': [2, 'stroustrup', { allowSingleLine: true }],
		'vue/max-attributes-per-line': 0,
		'vue/valid-v-for': 0,
		'generator-star-spacing': 'off',
		'arrow-parens': 0,
		'one-var': 0,
		'brace-style': 0,
	},
}
