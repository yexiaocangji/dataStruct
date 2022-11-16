//roleup测试
//https://rollupjs.org/guide/en/#command-line-flags  命令参数

//You must specify "output.format", which can be one of "amd", "cjs", "system", "es", "iife" or "umd".
// 1. amd -- 异步模块定义，用于像RequestJS这样的模块加载器。
// 2. cjs -- CommonJS, 适用于Node或Browserify/webpack
// 3. es -- 将软件包保存为ES模块文件。
// 4. iife -- 一个自动执行的功能，适合作为 <script>标签这样的。
// 5. umd -- 通用模块定义，以amd, cjs, 和 iife 为一体。

// # if you do not pass a file name, Rollup will try to load
// # configuration files in the following order:
// # rollup.config.mjs -> rollup.config.cjs -> rollup.config.js

//Node会依次在内置模块、全局模块和当前模块下查找相应模块代码
const typescript = require('rollup-plugin-typescript2');//typescript2 plugin
const glsl = require('rollup-plugin-glsl');
const uglify = require('rollup-plugin-uglify').uglify;

//直接参照laya官方compile.js
/**
 * @type{import('rollup').RollupOptions}
 * 可以配置多个任务，
 */
const config =  [
    {
        input: './src/Main.ts',//'./newScript/Main.js',//rollup执行入口文件
        output: {
            file:'./bin/js/bundle.js',//：rollup输出文件
            // file:'./bin/js/bundle.js',//：rollup输出文件
            format:'iife',//输出文件类型
            name:'',//生成的函数名,可以为空
            sourcemap:true,
            // compact:true,//压缩了部分代码，uglify好用
        },
        onwarn:(waring,warn)=>{
            if(waring.code == "CIRCULAR_DEPENDENCY"){
                console.log("warnning Circular dependency:");
                console.log(waring);
            }
        },
        //Rollup.js一个重要特性叫做'tree-shaking'，这个特性可以帮助你将无用代码（即没有使用到的代码）从最终的生成文件中删去。
        //（这个特性是基于ES6模块的静态分析的，也就是说，只有export而没有import的变量是不会被打包到最终代码中的）
        treeshake: false, //建议忽略（设置false,似乎也不会把没有用到的代码编译进来）
        plugins:[
            typescript({
                check: false, //Set to false to avoid doing any diagnostic checks on the code
                tsconfigOverride:{compilerOptions:{removeComments: true}}
            }),
            glsl({
                // By default, everything gets included
                include: /.*(.glsl|.vs|.fs)$/,
                sourceMap: false,
                compress:false
            }),
            // uglify({}),//压缩代码
        ]
    
    },
    {
        input: './bin/js/bundle.js',//将打包好js文件，混淆压缩
        output: {
            file:'./bin/js/bundle.min.js',//：rollup输出文件
            // file:'./bin/js/bundle.js',//：rollup输出文件
            format:'iife',//输出文件类型
            name:'rollupDemo',//生成的函数名,可以为空
            // sourcemap:true,
            // compact:true,//压缩了部分代码，uglify好用
        },
        onwarn:(waring,warn)=>{
            if(waring.code == "CIRCULAR_DEPENDENCY"){
                console.log("warnning Circular dependency:");
                console.log(waring);
            }
        },
        //Rollup.js一个重要特性叫做'tree-shaking'，这个特性可以帮助你将无用代码（即没有使用到的代码）从最终的生成文件中删去。
        //（这个特性是基于ES6模块的静态分析的，也就是说，只有export而没有import的变量是不会被打包到最终代码中的）
        treeshake: false, //建议忽略（设置false,似乎也不会把没有用到的代码编译进来）
        plugins:[
            typescript({
                check: false, //Set to false to avoid doing any diagnostic checks on the code
                tsconfigOverride:{compilerOptions:{removeComments: true}}
            }),
            glsl({
                // By default, everything gets included
                include: /.*(.glsl|.vs|.fs)$/,
                sourceMap: false,
                compress:false
            }),
            uglify({}),//压缩代码
        ]
    
    }
]
export default config