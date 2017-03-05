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
    "no-console": "off",
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "react/jsx-uses-vars": 1,
    "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
  },

  "globals": {
    //"document": false,
  }
};