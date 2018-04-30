const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const lessToJs = require('less-vars-to-js');
const path = require('path');
const fs = require('fs');

const themeVariables = lessToJs(
    fs.readFileSync(
        path.join(__dirname, './src/assets/less/ant-theme-vars.less'),
        'utf8'
    )
);

module.exports = function override(config, env) {
    config = injectBabelPlugin(
        ['import', { libraryName: 'antd', style: true }],
        config
    );
    config = rewireLess.withLoaderOptions({
        modifyVars: themeVariables
    })(config, env);
    return config;
};
