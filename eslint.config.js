import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

const isProd = process.env.NODE_ENV === 'production';

export default tseslint.config(
  { ignores: ['dist/**', 'coverage/**', 'node_modules/**'] },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    settings: {
      'import/resolver': { typescript: true },
    },
    rules: {
      eqeqeq: ['error', 'always'],
      'no-console': isProd ? 'warn' : 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'unused-imports/no-unused-imports': 'error',
      'import/order': ['warn', { 'newlines-between': 'always' }],
    },
  },
  prettier,
);
