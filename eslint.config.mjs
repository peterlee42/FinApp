import globals from 'globals';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: { ...globals.node, ...globals.jest },
      ecmaVersion: 'latest',
    },
  },
  { ignores: ['dist/**'] },
];
