const debug = require('debug')('aok.meta')
const find = require('find')




exports.get=(srcPath)=>{
    find.file(/(\.json)|(\.js)$/,srcPath,files=>{
        var metas =[]
        files.forEach(f=>{
            //load first
            
        })
    })
}


//exports.get("/home/rue/wp/aok.js/demo")