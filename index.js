const koa = require("koa")
const Router = require("koa-router")
//const bodyParser = require('koa-bodyparser')
const metaMan = require('./meta')
const utils = require('lisa.utils')
const LiSASync = require('lisa.sync')
const static = require('koa-static')
const cors = require('koa2-cors')
const LiSAJson = require('lisa.json')
const koaBody = require('koa-body')

const app = new koa()
//app.use(bodyParser())
const router = new Router()

var help = ""

var port = 10000


var help = ""

var addHelp = (port, path, method) => {
  //todo
  switch (method) {
    case 'GET':
      help += `http://localhost:${port}${path}`
      break
    case 'PUT':
      break
    case 'POST':
      break
    case 'DELETE':
      break
  }

}
var test = () => {

  //todo

  // exports.up([
  // { type: 'static',
  //     srcPath:  __dirname+'/demo/easy.json',
  //     name: 'easy',
  //     methods: [ {get:"@value"},{post : "@value"},{put:"@value"},{delete:"@dvalue"} ] 
  // }
  // ])

  exports.mount(__dirname + '/demo/test.json')

  // exports.up([
  //   { type: 'static',
  //       srcPath:  __dirname+'/demo/easy.json',
  //       name: 'easy',
  //       methods: [ {get:"@value"},{post : "@value"},{put:"@value"},{delete:"@dvalue"} ] 
  //   },
  //   { type: 'code',
  //     name: 'hello.world',
  //     methods: [{"get":"@g"},{"put":"@p"},{"post":"@update"},{"delete":"@remove"} ],
  //     value: { 
  //       '@g': async (paras)=>{ return await new Promise((r,j)=>{ r({ hello : "good day"})}) },
  //       "@p":(params) =>{ return params},
  //       '@update':params=>{ return new Promise((r,j)=>{ setTimeout(() => {
  //         params.hello = "update"
  //         r(params)
  //       }, 100);})},
  //       '@remove':params=>{return "hello.world remove"}
  //     },
  //     srcPath: 'F:\\workspace\\aok.js\\demo\\hello.js' 
  //   },
  //   { type: 'code',
  //     name: 'hello',
  //     methods:[{"get":"@get"},{"put":"@put"},{"post":"@post"},{"delete":"@del"} ],
  //     value: { 
  //       '@get': p=>{ return "hello get" } ,
  //       '@put':p=>{return "hello put" },
  //       '@post':p=>{return "hello post" },
  //       '@del':p=>{return "hello del" }
  //     },
  //     srcPath: 'F:\\workspace\\aok.js\\demo\\hello.js' 
  //   },
  //   { type: 'code',
  //     name: 'hello.world.why',
  //     methods: [ {"get":"@get"},{"put":"@put"},{"post":"@post"},{"delete":"@del"} ],
  //     value: { 
  //       '@get':  "hello.world.why get"  ,
  //       '@put': p=>{ return "hello.world.why put" },
  //       '@post': p=>{ return "hello.world.why post" },
  //       '@del': p=>{ return "hello.world.why del" }
  //     },
  //     srcPath: 'F:\\workspace\\aok.js\\demo\\hello.js' 
  //   }
  // ])
}
// router.get("/",(ctx , next)=>{

//     ctx.body = "hello"
// })

/*
[ { type: 'static',
    srcPath: 'F:\\workspace\\aok.js\\demo\\easy.json',
    name: 'easy',
    methods: [ [Object], [Object], [Object], [Object] ] },
  { type: 'code',
    name: 'hello',
    methods: [ [Object] ],
    value: { '@get': [AsyncFunction: @get] },
    srcPath: 'F:\\workspace\\aok.js\\demo\\hello.js' },
  { type: 'code',
    name: '',
    methods: [ [Object], [Object], [Object], [Object] ],
    value:
     { '@get': [AsyncFunction: @get],
       '@put': [Function: @put],
       '@post': [Function: @post],
       '@delete': [Function: @delete],
       hello: [Object] },
    srcPath: 'F:\\workspace\\aok.js\\demo\\index.js' },
  { type: 'static',
    srcPath: 'F:\\workspace\\aok.js\\demo\\son\\grandson\\index.json',
    name: 'son.grandson',
    methods: [ [Object], [Object], [Object], [Object] ] },
  { type: 'static',
    srcPath: 'F:\\workspace\\aok.js\\demo\\son\\index.json',
    name: 'son',
    methods: [ [Object], [Object], [Object], [Object] ] },
  { type: 'code',
    name: 'test.abc',
    methods: [ [Object], [Object] ],
    value: { '@get': 'here is get', '@update': [Function: @update] },
    srcPath: 'F:\\workspace\\aok.js\\demo\\test.js' },
  { type: 'static',
    name: 'test.testString.cde',
    methods: [ [Object] ],
    value: 'abc',
    srcPath: 'F:\\workspace\\aok.js\\demo\\test.js' },
  { type: 'static',
    name: 'test.testArray.cde',
    methods: [ [Object] ],
    value: [ 1, 'acb', [Object] ],
    srcPath: 'F:\\workspace\\aok.js\\demo\\test.js' },
  { type: 'static',
    name: 'test.testFunction.cde',
    methods: [ [Object] ],
    value: [Function: testFunction],
    srcPath: 'F:\\workspace\\aok.js\\demo\\test.js' } ]
*/

const getPath = resource => {
  return "/" + resource.replace(/\./g, '/').replace(/_any_/g, '*')
}

const setRightResult = (ctx, data) => {
  // if(ctx.request.accepts('xml')){
  // 	ctx.response.type='xml'
  // }else if(ctx.request.accepts('json')){
  // 	ctx.response.type='json'
  // }else if(ctx.request.accepts('html')){
  // 	ctx.response.type='html';
  // }else{
  //   ctx.response.type='text';
  // }
  // ctx.response.body=data;
  if (utils.Type.isObject(data)) {
    ctx.type = 'json'
  } else if (utils.Type.isArray(data)) {
    ctx.type = 'json'
  } else {
    if (utils.startWith(data, '<!DOCTYPE html>')) {
      ctx.type = 'text/html'
    } else {
      ctx.type = 'text'
    }
  }
  ctx.body = data
}

const registerRouter = (router, meta, dryRun, options, exts) => {
  var path = getPath(meta.name)

  //json 
  if (utils.endWith(meta.srcPath, '.json')) {
    var resouce = dryRun ? null : LiSASync(meta.srcPath)
    meta.methods.forEach(method => {
      // todo here to do json.js first
      if (method.get) {
        addHelp(port, path, 'GET')
        console.info(`GET : http://localhost:${port}${path}?node=`)
        router.get(path, async (ctx) => {
          //param  ctx.query
          //console.log(ctx.query)
          var data = await resouce.get()
          if (ctx.query.node) {
            data = LiSAJson(data).get(ctx.query.node)
          }
          setRightResult(ctx, data)
        })
      } else if (method.put) {
        addHelp(port, path, 'PUT')
        console.info(`PUT : http://localhost:${port}${path}?node=`)
        router.put(path, async (ctx) => {
          var paras = ctx.request.body
          resouce.sync(data => {
            if (ctx.query.node) {
              LiSAJson(data).set(ctx.query.node, paras)
            } else {
              return Object.assign({}, data, paras)
            }
            return data
          })
          setRightResult(ctx, {
            success: true
          })
        })
      } else if (method.post) {
        addHelp(port, path, 'POST')
        console.info(`POST : http://localhost:${port}${path}`)
        router.post(path, async (ctx) => {
          var paras = ctx.request.body
          resouce.sync(data => {
            return paras || data
          })
          setRightResult(ctx, {
            success: true
          })
        })
      } else if (method.delete) {
        addHelp(port, path, 'DELETE')
        console.info(`DELETE : http://localhost:${port}${path}?node=`)
        router.delete(path, async (ctx) => {
          var paras = ctx.request.body
          resouce.sync(data => {
            if (ctx.query.node) {
              LiSAJson(data).set(ctx.query.node, null)
              return data
            } else {
              return {}
            }
          })
          setRightResult(ctx, {
            success: true
          })
        })
      }
    })
  } else if (utils.endWith(meta.srcPath, '.js')) {
    //here is  code 
    //{"get":"@get"},{"put","@put"},{"post":"@post"},{"delete":"@del"}
    meta.methods.forEach(method => {
      if (method.get) {
        addHelp(port, path, 'GET')
        console.info(`GET : http://localhost:${port}${path}`)

        var fn = method.get != '@value' ? meta.value[method.get] : meta.value
        router.get(path, async (ctx, next) => {
          //ctx.body = "hello"
          var data = await Promise.resolve((utils.Type.isAsyncFunction(fn) || utils.Type.isFunction(fn)) ? fn(Object.assign({}, ctx.request.body || {}, ctx.query), ctx, options) : fn)
          setRightResult(ctx, data)
        })
      } else if (method.put) {
        addHelp(port, path, 'PUT')
        console.info(`PUT : http://localhost:${port}${path}`)
        var fn = meta.value[method.put]
        router.put(path, async (ctx, next) => {
          var data = await Promise.resolve((utils.Type.isAsyncFunction(fn) || utils.Type.isFunction(fn)) ? fn(Object.assign({}, ctx.query, ctx.request.body), ctx, options) : fn)
          setRightResult(ctx, data)
        })
      } else if (method.post) {
        addHelp(port, path, 'POST')
        console.info(`POST : http://localhost:${port}${path}`)
        var fn = meta.value[method.post]
        router.post(path, async (ctx, next) => {
          var data = await Promise.resolve((utils.Type.isAsyncFunction(fn) || utils.Type.isFunction(fn)) ? fn(Object.assign({}, ctx.query, ctx.request.body), ctx, options) : fn)
          setRightResult(ctx, data)
        })
      } else if (method.delete) {
        addHelp(port, path, 'DELETE')
        console.info(`DELETE : http://localhost:${port}${path}`)
        var fn = meta.value[method.delete]
        router.delete(path, async (ctx, next) => {
          var data = await Promise.resolve((utils.Type.isAsyncFunction(fn) || utils.Type.isFunction(fn)) ? fn(Object.assign({}, ctx.query, ctx.request.body), ctx, options) : fn)
          setRightResult(ctx, data)
        })
      }
    })
    //此处逻辑为扩展的逻辑
  } else if (exts && exts.length && exts.length > 0) {
    //先找到哪个扩展
    var arry = utils.ArrayFilter(exts, null, (one, two) => {
      return utils.endWith(meta.srcPath, two.ext)
    })
    if (arry.length == 0) {
      return
    }
    var ext = arry[0]
    if (ext.get) {
      addHelp(port, path, 'GET')
      console.info(`GET : http://localhost:${port}${path}`)
      router.get(path, async (ctx, next) => {
        var fn = ext.get
        var data = await Promise.resolve((utils.Type.isAsyncFunction(fn) || utils.Type.isFunction(fn)) ? fn(Object.assign({}, ctx.request.body || {}, ctx.query), ctx, options,meta) : fn)
        setRightResult(ctx, data)
      })
    }
    if (ext.put) {
      addHelp(port, path, 'PUT')
      console.info(`PUT : http://localhost:${port}${path}`)
      router.put(path, async (ctx, next) => {
        var fn = ext.put
        var data = await Promise.resolve((utils.Type.isAsyncFunction(fn) || utils.Type.isFunction(fn)) ? fn(Object.assign({}, ctx.query, ctx.request.body), ctx, options,meta) : fn)
        setRightResult(ctx, data)
      })
    }
    if (ext.post) {
      addHelp(port, path, 'POST')
      console.info(`POST : http://localhost:${port}${path}`)
      router.post(path, async (ctx, next) => {
        var fn = ext.post
        var data = await Promise.resolve((utils.Type.isAsyncFunction(fn) || utils.Type.isFunction(fn)) ? fn(Object.assign({}, ctx.query, ctx.request.body), ctx, options,meta) : fn)
        setRightResult(ctx, data)
      })
    }
    if (ext.delete) {
      addHelp(port, path, 'DELETE')
      console.info(`DELETE : http://localhost:${port}${path}`)
      router.delete(path, async (ctx, next) => {
        var fn = ext.delete
        var data = await Promise.resolve((utils.Type.isAsyncFunction(fn) || utils.Type.isFunction(fn)) ? fn(Object.assign({}, ctx.query, ctx.request.body), ctx, options,meta) : fn)
        setRightResult(ctx, data)
      })

    }
  }
}

exports.down = () => {
  //todo 
  //app.off()
}

exports.up = (metas, options, exts) => {
  options = options || {}
  options.port = options.port || 11540
  options.nocors = options.nocors || false
  port = options.port

  app.use(koaBody({
    multipart: true,
    formidable: {
      maxFileSize: options.maxFileSize || 52428800
    }
  }))

  //cors
  if (!options.nocors) {
    app.use(cors({}))
  }

  metas.forEach(meta => {
    registerRouter(router, meta, options.list, options, exts)
  });

  if (!options.list) {

    app.use(router.routes())
      .use(router.allowedMethods())
    // 添加 server
    app.listen(options.port)
    // app.on('close', err => {
    //   console.error('server errosdddddddddddddddddr', err)
    // });
    console.info(`web started : http://localhost:${options.port}/`)
  }

}

exports.getMetas = (resourcePath, exts) => {
  return new Promise((r, j) => {
    r(metaMan.get(resourcePath, null, exts))
  })
}


var mount = async (resourcePath, staticPath, options) => {
  options = options || {}
  options.resourcePath = resourcePath
  options.staticPath = staticPath
  options.port = options.port || 11540
  options.nocors = options.nocors || false
  options.nostaticGoFirst = options.nostaticGoFirst || false
  options.metas = options.metas || []
  options.ext = options.ext || false
  port = options.port

  //这里加载扩展
  var exts = null
  if (options.ext) {
    exts = await metaMan.loadExts(resourcePath)
  }
  var metas = await metaMan.get(resourcePath, options.ignore, exts)
  metas = metas.concat(options.metas)
  //order 
  metas.sort((a, b) => {
    /*{ type: 'code',
    name: 'api._any_',
    methods: [ [Object] ],
    value: { '@get': [AsyncFunction: @get] },
    srcPath: 'F:\\workspace\\pnote\\api\\_any_.js' }*/
    a = a.name
    b = b.name
    var aIndex = a.indexOf('_any_')
    var bIndex = b.indexOf('_any_')
    if (aIndex > -1 && bIndex > -1) {
      return aIndex < bIndex
    } else if (aIndex > -1) {
      return 1
    } else if (bIndex > -1) {
      return -1
    } else {
      return a < b
    }
  })

  //console.log(metas)
  if (!options.nostaticGoFirst) {
    if (!options.list) {
      if (staticPath) {
        console.log('mount static dir: ' + staticPath)
        // app.use(static(staticPath))
        mountStaticPath(staticPath)
      }
    }
  }
  exports.up(metas, options, exts)
  if (options.nostaticGoFirst) {
    if (!options.list) {
      if (staticPath) {
        console.log('mount static dir: ' + staticPath)
        // app.use(static(staticPath))
        mountStaticPath(staticPath)
      }
    }
  }
}

function mountStaticPath(statics){
    statics.split(',').forEach(root=>{
      app.use(static(root))
    })
}

exports.mount = mount

exports.list = (resourcePath, staticPath, options) => {
  options = options || {}
  options.list = true
  exports.mount(resourcePath, staticPath, options)
}

exports.test = test