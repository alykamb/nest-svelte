module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: ["./client/tsconfig.json"],
    },
    rules: {       
        "import/no-mutable-exports": 0,
        "no-labels": 0,
        "no-restricted-syntax": 0,
        'no-extra-parens': 'off',
        'no-extra-semi': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-floating-promises': [2, { ignoreVoid: true }],
        '@typescript-eslint/await-thenable': 2,
        '@typescript-eslint/no-extra-semi': 'off',
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/explicit-function-return-type': [2],
        '@typescript-eslint/explicit-member-accessibility': [
            2,
            {
                accessibility: 'explicit',
                overrides: {
                    accessors: 'explicit',
                    constructors: 'no-public',
                    methods: 'explicit',
                    properties: 'explicit',
                    parameterProperties: 'explicit',
                },
            },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/strict-null-checks': 'off',
        '@typescript-eslint/array-type': [
            2,
            {
                default: 'array-simple',
            },
        ],
        'sort-class-members/sort-class-members': [
            1,
            {
                order: [
                    '[static-properties]',
                    '[conventional-private-properties]',
                    '[properties]',
                    'constructor',
                    '[static-methods]',
                    '[conventional-private-methods]',
                    '[methods]',
                ],
                accessorPairPositioning: 'getThenSet',
            },
        ],
        'sort-imports-es6-autofix/sort-imports-es6': [
            1,
            {
                ignoreCase: false,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
            },
        ],
    },
    ignorePatterns: ["**/*.svelte"],
    plugins: ["@typescript-eslint", 'sort-class-members', 'sort-imports-es6-autofix'],
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:eslint-comments/recommended",
        "plugin:promise/recommended",
        "prettier",
        "prettier/@typescript-eslint",
    ],
    
};