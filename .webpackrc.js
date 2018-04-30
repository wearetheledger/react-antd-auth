//const path = require('path');

export default {
    entry: 'src/index.js',
    extraBabelPlugins: [
        'transform-decorators-legacy',
        [
            'import',
            { libraryName: 'antd', libraryDirectory: 'es', style: true }
        ],
        [
            'dotenv-import',
            {
                moduleName: '@env',
                path: '.env',
                blacklist: null,
                whitelist: null,
                safe: false,
                allowUndefined: false
            }
        ]
    ],
    alias: {
        //'components': path.resolve(__dirname, 'src/components/'),
    },
    outputPath: 'build',
    ignoreMomentLocale: true,
    theme: './src/theme.js',
    html: {
        template: './public/index.ejs'
    },
    disableDynamicImport: true
};
