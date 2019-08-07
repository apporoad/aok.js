const debug = require('debug')('aok.meta')
const find = require('find')
const utils = require('lisa.utils')
const path = require('path')
const fs = require('fs')

const test = ()=>{
    //exports.get( __dirname + "/demo")

    //resolveModule(require(__dirname + '/demo/index.json'))

    resolveModule(require(__dirname + '/demo/test.js')) // {abc: Object, cde: Object}

    resolveModule(require(__dirname + '/demo/index.js')) // {@get: , @put: , @post: , @delete: , hello: Object}
}

const resolveModule = (m)=>{
    var metas = []
    //console.log(m)
    if(utils.Type.isObject(m)){
        Object.keys(m).forEach(function (key) {
            switch(key.toLocaleLowerCase()){
                case "@get":
                case "@g":
                case "@search":
                case "@find":
                case "@read":
                case "@r":
                    break;
                case "@post":
                case "@add":
                case "@create":
                case "@c":
                    break;
                case "@put":
                case "@update":
                case "@edit":
                case "@modify":
                case "@u":
                    break;
                case "@patch":
                    debug("@patch unsupported")
                    break;
                case "@delete":
                case "@remove":
                case "@kill":
                case "@clear":
                case "@clean":
                case "@rm":
                case "@del":
                case "@d":
                    break
            }
        });
    }
}

const getMetaFromFile = filePath =>{
    //load first
    console.log(filePath)
    ///home/rue/wp/aok.js/demo/easy.json
    /**
     * "type" : "static | code",
    "srcPath" : "/aaa/bbb/index.js",
    "name" : "aaa.bbb",
    "methods" :["get","put","post","delete"],
    "enable" : true,
    "msg" : "conflict with file:xxxxx"
        */
    var type = "static" 
    var methods =["get","put","post","delete"] 
    if(utils.endWith(filePath,"js")){
        type = "code" 

    }
    return {
                "type" : type ,
                "srcPath" : filePath,
                "name" : "xxx"

            }

}

const getMetaFromDir = dirPath =>{
    find.file(/(\.json)|(\.js)$/,dirPath,files=>{
        var metas =[]
        files.forEach(f=>{
           var meta = getMetaFromFile(f)
           if(meta)
                metas.push(meta)
        })
    })
}
exports.get=(srcPath)=>{
    return new Promise((r,j)=>{
        if(fs.statSync(srcPath).isFile){
            r([getMetaFromFile(srcPath)])
        }else
            r(getMetaFromDir(srcPath))
    })
}




exports.test = test