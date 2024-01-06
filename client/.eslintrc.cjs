module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-console': ['error', { allow: ['warn', 'error', 'log'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-param-reassign': [2, { props: false }],
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 0,
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['function-declaration', 'arrow-function'],
        unnamedComponents: 'arrow-function',
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'react/jsx-no-undef': ['error', { 
        allow: [''] 
      }
    ],
  },
};
