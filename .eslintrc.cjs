module.exports = {
    // 表示這個 ESLint 配置文件是在根目錄下的
    root: true,
    // 設置程式運行環境
    env: {
        node: true,
    },
    // 擴展預定義的配置
    extends: [
        'plugin:vue/essential',
        // 'plugin:vue/recommended',
        'plugin:@typescript-eslint/recommended',
        'standard',
    ],
    // 設置解析選項
    parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: false,
        },
        parser: '@typescript-eslint/parser',
    },
    parser: 'vue-eslint-parser',
    plugins: ['@typescript-eslint'],
    // 設置規則
    rules: {
        // typescript-eslint 可以使用any
        '@typescript-eslint/no-explicit-any': ['off'],
        // 禁用 console
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // 禁用 debugger
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // 允許多個變數賦值
        'no-multi-assign': 'off',
        // 允許不給函數命名
        'func-names': 0,
        // 控制逗號的使用方式
        'comma-dangle': [1, 'only-multiline'],
        // 允許使用 alert
        'no-alert': 0,
        // 取消行長限制
        'max-len': 0,
        // 取消對全局變數的限制
        'no-restricted-globals': 0,
        // 允許多個空格
        'no-multi-spaces': ['error', { ignoreEOLComments: true }],
        // 設置駝峰式命名的規則
        camelcase: ['error', { ignoreDestructuring: true, properties: 'never' }],
        // 指定物件的大括號使用方式
        'object-curly-newline': ['error', { consistent: true }],
        // 允許使用 global.require
        'global-require': 0,
        // 不要求模組使用默認導出
        'import/prefer-default-export': 'off',
        // 取消模組導入的順序要求
        'import/order': 'off',
        // 設置縮排為4個空格
        indent: [2, 4, { SwitchCase: 1 }],
        // 允許使用 click 事件而不必要求使用對應的鍵盤事件
        'vuejs-accessibility/click-events-have-key-events': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        // 允許存在未使用到的參數
        'no-unused-vars': 0,

        // 以下是針對 vue 的配置// 允許多字詞的組件名稱
        'vue/multi-word-component-names': 'off',
        // 排序attribute
        'vue/attributes-order': [
            'error',
            {
                order: [
                    // 条件指令
                    'CONDITIONALS', // 例如：v-if, v-show
                    'DEFINITION', // 例如 v-bind 和 v-model。
                    'LIST_RENDERING', // 例如 v-for。
                    'RENDER_MODIFIERS', // 例如 v-pre 和 v-cloak
                    'GLOBAL', // 例如 id 和 class
                    ['UNIQUE', 'SLOT'], // 例如 v-slot，這些屬性彼此之間有特定的排序關係。
                    'OTHER_DIRECTIVES', // 其他指令。
                    'OTHER_ATTR', // 其他屬性。
                    'EVENTS', // 例如 @click。
                    'CONTENT', // 內容屬性。
                ],
                alphabetical: false,
            },
        ],
        semi: ['error', 'always'],
        // 傳入props的組建要用dash格式
        'vue/attribute-hyphenation': [
            'error',
            'always',
            {
                ignore: [],
            },
        ],
        // 組建的name要用大駝峰寫
        'vue/component-definition-name-casing': ['error', 'PascalCase'],
        // html tag的尾巴角括號要換行
        'vue/html-closing-bracket-newline': [
            'warn',
            {
                singleline: 'never',
                multiline: 'always',
            },
        ],
        // 尾巴tag是否要有一個空格（</div> -> </div >）
        // 'vue/html-closing-bracket-spacing': [
        //     'warn',
        //     {
        //         startTag: 'never',
        //         endTag: 'always',
        //         selfClosingTag: 'always'
        //     }
        // ],
        // 超過一個attribute的div，要換行
        'vue/max-attributes-per-line': [
            'warn',
            {
                singleline: {
                    max: 1,
                },
                multiline: {
                    max: 1,
                },
            },
        ],
        // div tag的排版
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],
        // vue的div內{{}}中要有空格
        'vue/mustache-interpolation-spacing': ['warn', 'always'],
        // 不能有無謂的空格
        'vue/no-multi-spaces': [
            'warn',
            {
                ignoreProperties: false,
            },
        ],
        // attribute的等號左右不能有空格（例如<div class = "123"）
        'vue/no-spaces-around-equal-signs-in-attribute': ['warn'],
        // 組建內的props要用小駝峰命名
        'vue/prop-name-casing': ['warn', 'camelCase'],
        // div的v-bind前綴省略
        'vue/v-bind-style': ['warn', 'shorthand'],
        // div的v-on前綴省略
        'vue/v-on-style': ['warn', 'shorthand'],
        // vue的tag order
        'vue/block-order': [
            'error',
            {
                order: [['script', 'template'], 'style'],
            },
        ],
        //  以下是適合vue 2寫法的
        // vue的properties間至少要有一個空格
        // 'vue/new-line-between-multi-line-property': ['warn', {
        //     minLineOfMultilineProperty: 1
        // }]
        // 組建要emit的function必須先定義
        // 'vue/require-explicit-emits': ['error', {
        //     allowProps: false
        // }],
    },
};
