const debug = require('debug')('aok.meta')
const find = require('find')
const utils = require('lisa.utils')
const path = require('path')
const fs = require('fs')

const test = ()=>{
    

}

const resolveModule = (m)=>{

}

const getMetaFromFile = filePath =>{
    //load first
    console.log(f)
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
    if(utils.endWith(f,"js")){
        type = "code" 

    }
    return {
                "type" : type ,
                "srcPath" : f,
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
        if(fs.statSync(filePath).isFile){
            r([getMetaFromFile(srcPath)])
        }else
            r(getMetaFromDir(srcPath))
    })
}


exports.get("/home/rue/wp/aok.js/demo")


exports.test = test