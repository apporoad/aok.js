const debug = require('debug')('aok.meta')
const find = require('find')
const utils = require('lisa.utils')
const path = require('path')
const fs = require('fs')
const gparser = require('gitignore-parser')
const { exec } = require('child_process')

const test = () => {
    //exports.get( __dirname + "/demo")

    //resolveModule(require(__dirname + '/demo/index.json'))

    //console.log(resolveModule(require(__dirname + '/demo/test.js')))// {abc: Object, cde: Object}

    //getMetaFromFile(__dirname + '/demo/bad.js')

    //console.log(getMetaFromFile(__dirname + '/demo/test.js'))

    //console.log(getMetaFromFile(__dirname + '/demo/index.js'))

    getMetaFromDir(__dirname + '/demo', __dirname + '/demo/.aokignore').then(metas => {
        console.log(metas)
        metas.forEach(m => {
            console.log(m.name + "  |  " + m.srcPath)
        })
    })

    //resolveModule(require(__dirname + '/demo/index.js')) // {@get: , @put: , @post: , @delete: , hello: Object}
}

const resolveModule = (m) => {
    /*
     * "type" : "static | code",
    "srcPath" : "/aaa/bbb/index.js",
    "name" : "aaa.bbb",
    "methods" :[{"get":"@get"},{"put","@put"},{"post":"@post"},{"delete":"@del"}],
    "enable" : true,
    "msg" : "conflict with file:xxxxx"
    */
    var metas = []
    //console.log(m)
    if (utils.Type.isObject(m)) {
        var thisMeta = {
            type: "code",
            name: "",
            methods: [],
            value: m
        }
        Object.keys(m).forEach(function (key) {
            switch (key.toLocaleLowerCase()) {
                case "@get":
                case "@g":
                case "@search":
                case "@find":
                case "@read":
                case "@r":
                    if (utils.ArrayContains(thisMeta.methods, key, (one, ele) => {
                            return ele["get"]
                        })) {
                        debug("methods get registered repeatly : ignore :" + key)
                    } else {
                        thisMeta.methods.push({
                            get: key
                        })
                    }
                    break;
                case "@post":
                case "@add":
                case "@create":
                case "@c":
                    if (utils.ArrayContains(thisMeta.methods, key, (one, ele) => {
                            return ele["post"]
                        })) {
                        debug("methods post registered repeatly : ignore :" + key)
                    } else {
                        thisMeta.methods.push({
                            post: key
                        })
                    }
                    break;
                case "@put":
                case "@update":
                case "@edit":
                case "@modify":
                case "@u":
                    if (utils.ArrayContains(thisMeta.methods, key, (one, ele) => {
                            return ele["put"]
                        })) {
                        debug("methods put registered repeatly : ignore :" + key)
                    } else {
                        thisMeta.methods.push({
                            put: key
                        })
                    }
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
                    if (utils.ArrayContains(thisMeta.methods, key, (one, ele) => {
                            return ele["delete"]
                        })) {
                        debug("methods delete registered repeatly : ignore :" + key)
                    } else {
                        thisMeta.methods.push({
                            delete: key
                        })
                    }
                    break
                default:
                    if (utils.startWith(key, "@")) {
                        debug("unsuported method:" + key)
                    } else {
                        var childMetas = resolveModule(m[key])
                        childMetas.forEach(cm => {
                            cm.name = key + (key && cm.name ? '.' : "") + cm.name
                        })
                        metas = metas.concat(childMetas)
                    }
                    break
            }
        });
        if (thisMeta.methods.length > 0) {
            metas.push(thisMeta)
        }
    } else {
        metas.push({
            type: "static",
            name: "",
            methods: [{
                get: "@value"
            }],
            value: m
        })
    }
    return metas
}

const getMetaFromFile = filePath => {
    var metas = []
    ///home/rue/wp/aok.js/demo/easy.json
    /**
     * "type" : "static | code",
    "srcPath" : "/aaa/bbb/index.js",
    "name" : "aaa.bbb",
    "methods" :[...],
    "enable" : true,
    "msg" : "conflict with file:xxxxx"
        */
    var type = "static"
    //here name is defined outside 
    var name = ""
    // var name =  path.parse(filePath).name 
    // // index  is ""
    // name = name == "index" ? "" : name
    var methods = [{
        get: "@value"
    }, {
        post: "@value"
    }, {
        put: "@value"
    }, {
        delete: "@value"
    }]
    if (utils.endWith(filePath, "js")) {
        var thisModule = null
        //try load
        try {
            thisModule = require(filePath)
            var cms = resolveModule(thisModule)
            cms.forEach(ele => {
                ele.name = name + (name && ele.name ? '.' : "") + ele.name
                ele.srcPath = filePath
            })
            metas = metas.concat(cms)
        } catch (e) {
            console.error("your js file is not right:" + filePath)
            console.error("++++++++++++++++++++++++++++++++")
            console.error(e)
            console.error("================================")
        }
    } else {
        metas.push({
            "type": type,
            "srcPath": filePath,
            "name": name,
            "methods": methods
        })
    }
    return metas
}

const compareMeta1gt2 = (first, second) => {
    // code > static
    if (first.type == "static" && second.type == "code") {
        return false
    }
    // index.js > index.json
    if (utils.indexOfString(first.srcPath, "index") > -1 &&
        utils.indexOfString(second.srcPath, "index") > -1) {
        return utils.indexOfString(first.srcPath, "index.js") > -1
    }
    // xxx  > index.xxx
    if (utils.indexOfString(first.srcPath, "index") > -1) {
        return false
    }
    return true
}

const trimRepeatedMeta = metas => {
    var finalMetas = []
    var tempMap = {}
    metas.forEach(meta => {
        if (tempMap[meta.name]) {
            var throwMeta = meta
            if (!compareMeta1gt2(tempMap[meta.name], meta)) {
                throwMeta = tempMap[meta.name]
                tempMap[meta.name] = meta
            }
            console.info("aok:meta: resouces defined repeated , this resource is discarded : (" + meta.name + ") from " + throwMeta.srcPath)
        } else {
            tempMap[meta.name] = meta
        }
    })
    Object.keys(tempMap).forEach(key => {
        finalMetas.push(tempMap[key])
    })
    return finalMetas
}

const searchFile = async (pattern, dirPath) => {
    return new Promise((r) => {
        find.file(pattern || /(\.json)|(\.js)$/, dirPath, files => {
            r(files)
        })
    })
}

const getMetaFromDir = async (dirPath, ignorePath, exts) => {
    var gitignore = (ignorePath && fs.existsSync(ignorePath)) ? gparser.compile(fs.readFileSync(ignorePath, 'utf8')) : null
    //添加默认忽略node_modules/
    if (!gitignore) {
        gitignore = gparser.compile('node_modules/')
    }

    var files = await searchFile(null, dirPath)
    //扩展情况
    var allExt =  [".json", ".js"]
    if(exts && exts.length && exts.length>0){
        for(var i = 0 ;i<exts.length ;i++){
            var ext = exts[i]
            if(ext.searchPattern){
                files = files.concat(await searchFile(ext.searchPattern, dirPath))
            }
            if(ext.ext){
                allExt.push(ext.ext)
            }
        }
    }
    var metas = []
    //console.log(dirPath)
    files.forEach(f => {
        // .   son   dir1/dir2
        var rBasePath = utils.startTrim(utils.startTrim(f.replace(/[\\]/g, "/"), dirPath.replace(/[\\]/g, "/")), "/")
        // add ignore logic
        if (gitignore && gitignore.denies(rBasePath)) {
            debug(f, " => ignored by ", ignorePath)
            return
        }
        rBasePath = utils.endTrim(rBasePath, allExt)
        //get resource root name :  
        /*
         demo\easy.json => easy
         demo\index.js => 
         demo\index.json => 
         demo\son\grandson\index.json => son.grandson
         demo\son\index.json => son
         demo\test.js => test
        */
        var resourceRootName = utils.endTrim(utils.endTrim(rBasePath.replace(/[\\\/]/g, '.'), "."), [".index", "index"])
        debug(f, " => ", resourceRootName)
        var fmetas = getMetaFromFile(f)
        fmetas.forEach(ele => {
            ele.name = resourceRootName + (resourceRootName && ele.name ? '.' : "") + ele.name
        })
        metas = metas.concat(fmetas)
    })
    // trim same resource name
    return trimRepeatedMeta(metas)

}
exports.get = (srcPath, ignorePath,exts) => {
    return new Promise((r, j) => {
        if (fs.statSync(srcPath).isFile()) {
            r(getMetaFromFile(srcPath))
        } else
            r(getMetaFromDir(srcPath, ignorePath,exts))
    })
}

exports.loadExts = async (path)=>{
    var files = await searchFile(/\.aok$/,path)
    var exts  = []
    for(var i =0 ;i<files.length;i++){
        var f = files[i]
        try{
            exts.push(require(f))
        }catch(e){
            debug("load ext error:" + f)
        }
    }
    return exts
}




exports.test = test