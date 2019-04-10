module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['standard', 'plugin:vue/recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: [2, 'always'],
    'space-before-function-paren': ['error', 'never']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
