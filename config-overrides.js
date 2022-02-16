const {override, fixBabelImports} = require('customize-cra');
//add customize-cra-less-loader
const addLessLoader = require("customize-cra-less-loader");

module.exports = override(
    //antd accroding to import to package(babel-plugin-import)
    fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
    }),
    addLessLoader({
        lessLoaderOptions:{
        lessOptions: {
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1DA57A'},
        },
    },
        }),
    // {
    //     loader: 'less-loader', 
    //     options: {
    //         lessOptions: {
    //             javascriptEnabled: true
    //           }
    //     }
    // }

        
    );