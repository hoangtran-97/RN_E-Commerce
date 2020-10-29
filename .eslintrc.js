module.exports = {
    root: true,
    extends: "@react-native-community",
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    rules: {
        indent: ["error", 4, { SwitchCase: 1 }],
        quotes: ["error", "double"],
        "@typescript-eslint/no-unused-vars": "warn",
        "comma-dangle": "off"
    }
};
