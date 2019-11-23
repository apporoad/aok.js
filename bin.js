#! /usr/bin/env node
const path = require('path')
const fs = require('fs')
const program = require('commander')
const aok = require('./index')
const uitls = require('lisa.utils')
const rimraf = require('rimraf')
const dl = require('lisa.dl')
const cleanup = require('./cleanup')


program.version(require('./package.json').version)
    .usage(' [path]  path可以为本地路径（本地目录时为工作目录）、可以为远程或本地zip文件，可以是git路径')
    .option('--type <type>', '资源类型，local代表本地路径','local', 'zip','git')
    .option('-r --rpath [value]','相对于工作目录的aok路径，默认值为工作目录的根目录')
    .option('-p --port [value]', '端口号，默认是11540')
    .option('-s --staticPath [value]', '静态路径，当path为zip文件或者git路径时，静态路径的相对路径是针对于工作目录而言的' )
    .option('-l --list',"不启动，只查看可用资源")
    .option('-i --ignore [value]','ignore文件路径, 默认是工作目录下的 .aokignore , aokignore使用完全与.gitignore一致')
    .option('--no-cors','关闭跨域')
    .option('--no-staticGoFirst','取消优先mount静态路径')
    .option('-d --dirty','只有path为zip文件或者git路径时有效，默认是纯净模式，执行完将删除临时文件')
    .option('-w --workspace [value]','只有path为zip文件或者git路径时有效, 默认为.aok文件夹，当workspace文件夹中存在内容时，不会再次解压或者下载资源')
    .parse(process.argv)



var rPath = '.'
if(program.args.length > 0)
{
    rPath = program.args[0]
}

var run =(rp,static)=>{
    var options = {}
    options.port = program.port || 11540
    options.nocors = !program.cors
    options.nostaticGoFirst = !program.staticGoFirst
    options.ignore = path.resolve(rp,(program.ignore || '.aokignore'))

    if(program.rpath){
        rp = path.resolve(rp,program.rpath)
    }
    //console.log(program.list)
    if(program.list){
        aok.list(rp,static,options)
    }else
        aok.mount(rp,static,options)
}

if(program.type =='zip' || program.type =='git' || uitls.endWith(rPath,'.zip') || uitls.startWith(rPath,'http')){
    
    //workspace
    var ws =  path.resolve(process.cwd(), (program.workspace || '.aok'))
    //相对静态路径
    var static = program.staticPath
    if(static){
        static = path.resolve(ws,static)
    }
    if(fs.existsSync(ws)){
        console.log('workspace already created')
        run(ws,static)
        // cleanup.Cleanup(()=>{
        //     //stop fist
        //     aok.down()
        //     console.log(ws )
        //     rimraf(ws,error=>{
        //         console.log('自动删除目录'+ ws+'失败，请手动删除:' + error)
        //     })
        // })
    }
    else{
        //todo git zip 
        var type = program.type
        if(type != 'zip' && type != 'git'){
            type =uitls.endWith(rPath,'.zip') ?  'zip' : 'git'
        }
        cleanup.Cleanup(()=>{
            //stop fist
            //aok.down()
            console.log('生成临时文件目录为：' + ws)
            //console.log(program.dirty)
            if(!program.dirty){
                console.log('auto delete : ' + ws)
                rimraf(ws,error=>{
                    console.log('自动删除目录'+ ws+'失败，请手动删除:' + error)
                })
            }

        })
        dl.getRepo(rPath,ws,type).then(()=>{
            run(ws,static)
        })
    }

}else
{
    rPath = path.resolve(process.cwd(),rPath)

    if(fs.existsSync(rPath)){
        var static = program.staticPath
        if(static){
            static = path.resolve(process.cwd(),static)
        }
        run(rPath,static)
    }else{
        console.log('path not exsits')
    }
}


