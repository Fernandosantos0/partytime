module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/newline-after-import': 'off',
    'space-before-function-paren': 'off',
    'no-console': 'off',
    'indent': 0,
    'quotes': 'off',
    'array-bracket-spacing': 'off',
    'keyword-spacing': 'off',
    'eol-last': 'off',
    'quote-props': 'off',
    'no-useless-return': 'off',
  },
};
