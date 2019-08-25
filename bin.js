#! /usr/bin/env node
const path = require('path')
const fs = require('fs')
const program = require('commander')
const aok = require('./index')

program.version(require('./package.json').version)
    .usage(' [path]')
    .option('-p --port [value]', '端口号，默认是11540')
    .option('-s --staticPath [value]', '静态路径' )
    .option('-l --list',"不启动，只查看可用资源")
    .option('--no-cors','关闭跨域')
    .option('--no-staticGoFirst','取消优先mount静态路径')
    .parse(process.argv)

var rPath = '.'
if(program.args.length > 0)
{
    rPath = program.args[0]
}

rPath = path.resolve(process.cwd(),rPath)

if(fs.existsSync(rPath)){
    var options = {}
    options.port = program.port || 11540
    options.nocors = !program.cors
    options.nostaticGoFirst = !program.staticGoFirst
    var static = program.staticPath
    if(static){
        static = path.resolve(process.cwd(),static)
    }
    if(program.list){
        aok.list(rPath,program.staticPath,options)
    }else
        aok.mount(rPath,program.staticPath,options)
}else{
    console.log('path not exsits')
}