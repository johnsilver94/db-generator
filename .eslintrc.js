module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    'plugin:prettier/recommended',
    'prettier/vue'
  ],
  plugins: ['vue', 'prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': ['error', { singleQuote: true, parser: 'flow' }]
  }
};
