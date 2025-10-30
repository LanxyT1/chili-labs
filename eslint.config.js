import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import header from 'eslint-plugin-header'
import prettier from 'eslint-plugin-prettier';

header.rules.header.meta.schema = false;

export default tseslint.config([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            header,
            prettier
        },
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser
        },
        rules: {
            "header/header": [
                "error",
                "block",
                "Copyright © 2025 Chili Labs. All rights reserved."
            ],
            "prettier/prettier": [
                "error",
                {
                    "singleAttributePerLine": true,
                    "tabWidth": 4,
                    "useTabs": false
                }
            ]
        }
    }
])