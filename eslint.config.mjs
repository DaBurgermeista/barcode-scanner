import js from '@eslint/js';
import globals from 'globals';
import json from 'eslint-plugin-json';
import markdown from 'eslint-plugin-markdown';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
	{
		files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
		languageOptions: {
			globals: globals.browser
		},
		plugins: {
			prettier: prettierPlugin
		},
		rules: {
			...js.configs.recommended.rules,
			'prettier/prettier': ['error', { useTabs: true }]
		}
	},
	{
		files: ['**/*.json'],
		plugins: {
			json
		},
		languageOptions: {
			parserOptions: {
				ecmaVersion: 'latest'
			}
		},
		rules: {
			...json.configs.recommended.rules
		}
	},
	{
		files: ['**/*.md'],
		plugins: {
			markdown
		},
		rules: {
			...markdown.configs.recommended.rules
		}
	},
	{
		files: ['**/*.css'],
		languageOptions: {
			parser: null // ESLint doesn't parse CSS
		}
	}
];
