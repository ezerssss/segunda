module.exports = {
    parser: "@typescript-eslint/parser",
    extends: ["expo", "prettier"],
    plugins: ["prettier", "react", "unused-imports", "@typescript-eslint"],
    rules: {
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto",
            },
        ],
        "@typescript-eslint/no-unused-vars": "error",
    },
};
