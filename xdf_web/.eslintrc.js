// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    "globals": {
        "$": true,
        "THREE": true,
        "TWEEN": true,
        "Stats": true
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        'indent': 0, // 忽略indent
        // allow paren-less arrow functions
        'arrow-parens': 0,
        'semi': 0,
        // allow async-await
        'no-trailing-spaces': 0,
        'comma-dangle': 0,
        'generator-star-spacing': 0,
        'space-before-function-paren': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
