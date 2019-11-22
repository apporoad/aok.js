#! /usr/bin/env node
const path = require('path')
const fs = require('fs')
const program = require('commander')
const aok = require('./index')
const uitls = require('lisa.utils')


program.version(require('./package.json').version)
    .usage(' [path]  path可以为本地路径（本地目录时为工作目录）、可以为远程或本地zip文件，可以是git路径')
    .option('-r --rpath [value]','相对于工作目录的aok路径，默认值为工作目录的根目录')
    .option('-p --port [value]', '端口号，默认是11540')
    .option('-s --staticPath [value]', '静态路径，当path为zip文件或者git路径时，静态路径的相对路径是针对于工作目录而言的' )
    .option('-l --list',"不启动，只查看可用资源")
    .option('-i --ignore [value]','ignore文件路径, 默认是工作目录下的 .aokignore , aokignore使用完全与.gitignore一致')
    .option('--no-cors','关闭跨域')
    .option('--no-staticGoFirst','取消优先mount静态路径')
    .option('--no-dirty','只有path为zip文件或者git路径时有效，默认是纯净模式，执行完将删除临时文件')
    .option('-w --workspace [value]','只有path为zip文件或者git路径时有效, 默认为.aok文件夹，当workspace文件夹中存在内容时，不会再次解压或者下载资源')
    .parse(process.argv)

var rPath = '.'
if(program.args.length > 0)
{
    rPath = program.args[0]
}

if(uitls.endWith(rPath,'.zip') || uitls.startWith(rPath,'http')){
    //workspace
    var ws =  path.resolve(process.cwd(), (program.workspace || '.aok'))
    //相对静态路径
    var static = program.staticPath
    if(static){
        static = path.resolve(ws,static)
    }
    if(fs.existsSync(ws)){
        console.log('workspace already created')
        if(program.rpath){
            ws = path.resolve(ws,program.rpath)
        }
        if(program.list){
            aok.list(ws,static,options)
        }else
            aok.mount(ws,static,options)
    }
    else{
        //todo git zip 

    }

}else
{
    rPath = path.resolve(process.cwd(),rPath)

    if(fs.existsSync(rPath)){
        var options = {}
        options.port = program.port || 11540
        options.nocors = !program.cors
        options.nostaticGoFirst = !program.staticGoFirst
        options.ignore = path.resolve(rPath,(program.ignore || '.aokignore'))
        var static = program.staticPath
        if(static){
            static = path.resolve(process.cwd(),static)
        }
        if(program.rpath){
            rPath = path.resolve(rPath,program.rpath)
        }
        if(program.list){
            aok.list(rPath,static,options)
        }else
            aok.mount(rPath,static,options)
    }else{
        console.log('path not exsits')
    }
}


