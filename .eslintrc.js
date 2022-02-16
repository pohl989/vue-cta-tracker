module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [`plugin:vue/vue3-essential`, `eslint:recommended`, `@vue/prettier`],
  parserOptions: {
    parser: `babel-eslint`
  },
  rules: {
    'vue/no-multiple-template-root': `off`,
    'no-console': process.env.NODE_ENV === `production` ? `warn` : `off`,
    'no-debugger': process.env.NODE_ENV === `production` ? `warn` : `off`,
    'no-unused-vars': `warn`,
    'prettier/prettier': [
      `warn`,
      {
        singleQuote: true,
        semi: false,
        trailingComma: `none`
      }
    ],
    quotes: [`error`, `backtick`],
    'no-extra-boolean-cast': `off`,
    'vue/attribute-hyphenation': [
      `error`,
      `always`,
      {
        ignore: [`I`]
      }
    ]
  }
}
