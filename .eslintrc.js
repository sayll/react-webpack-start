module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "mocha": true,
    "jest": true,
  },

  "extends": ["eslint:recommended", "airbnb"],

  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module"
  },

  "plugins": [
    "react"
  ],

  "rules": {
    "comma-dangle": ["error", "only-multiline"],

    "linebreak-style": [
      "error",
      "windows"
    ],

    "no-console": "off",

    "quotes": [
      "error",
      "single"
    ],

    "react/jsx-uses-vars": 1,

    // "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],

    "semi": [
      "error",
      "always"
    ],
  },

  "globals": {
    "document": false,
    "window": false,
  }
};