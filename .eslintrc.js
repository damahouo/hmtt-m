module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    // 'space-before-function-paren': ['error', 'never', {
    //   anonymous: 'always',
    //   named: 'always',
    //   asyncArrow: 'always'
    // }],
    // 'space-before-function-paren': 0,
    'space-before-function-paren': ['error', 'never'],
    // 解决函数名前加空格
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
