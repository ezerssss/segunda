module.exports = {
    extends: ["expo", "prettier"],
    plugins: ["prettier", "react"],
    rules: {
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto",
            },
        ],
    },
};
