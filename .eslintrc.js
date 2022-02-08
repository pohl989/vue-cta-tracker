module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ["prettier"],
  extends: [
    "prettier",
    "plugin:prettier/recommended",
    "eslint:recommended",
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      globalReturn: false,
    },
    babelOptions: {
      configFile: "./babel.config.js",
    },
  },
  // add your custom rules here
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": "warn",
    "quotes": ["error", "backtick"],
    "no-extra-boolean-cast": "off",
    "vue/attribute-hyphenation": ["error", "always", {
      "ignore": ["I"]
    }],
  },
};
