const koa = require("koa")
const Router = require("koa-router")
const bodyParser = require('koa-bodyparser')
const metaMan =require('./meta')
const utils = require('lisa.utils')
const LiSASync = require('lisa.sync')
const static = require('koa-static')
const cors = require('koa2-cors')

const app = new koa()
app.use(bodyParser())
const router = new Router()

var help = ""

var port = 10000

var help = ""

var addHelp = (port,path,method)=>{
  //todo
  switch(method){
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
var test = ()=>{

    //todo

    // exports.up([
      // { type: 'static',
      //     srcPath:  __dirname+'/demo/easy.json',
      //     name: 'easy',
      //     methods: [ {get:"@value"},{post : "@value"},{put:"@value"},{delete:"@dvalue"} ] 
      // }
    // ])

    exports.mount(__dirname+'/demo/test.js')

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

const getPath = resource =>{
    return "/" + resource.replace(/\./g,'/')
}

const setRightResult =(ctx , data)=>{
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
  if(utils.Type.isObject(data)){
    ctx.type='json'
  }else{
    ctx.type='text'
  }
  ctx.body=data
}

const registerRouter= (router,meta)=>{
    var path = getPath(meta.name)

    //json 
    if(utils.endWith(meta.srcPath,'.json')){
      var resouce = LiSASync(meta.srcPath)
       meta.methods.forEach(method=>{
        // todo here to do json.js first
          if(method.get){
            addHelp(port,path,'GET')
            console.info(`GET : http://localhost:${port}${path}`)
            router.get(path,async (ctx)=>{
              //param  ctx.query
              //console.log(ctx.query)
              var data =await resouce.get()
              setRightResult(ctx,data)
            })
          }else if(method.put){
            addHelp(port,path,'PUT')
            console.info(`PUT : http://localhost:${port}${path}`)
            router.put(path,async (ctx)=>{
              var paras = ctx.request.body
              resouce.sync(data=>{
                return Object.assign({}, data, paras)
              })
              setRightResult(ctx,{success:true})
            })
          } else if(method.post){
            addHelp(port,path,'POST')
            console.info(`POST : http://localhost:${port}${path}`)
            router.post(path,async (ctx)=>{
              var paras = ctx.request.body
              resouce.sync(data=>{
                return paras || data
              })
              setRightResult(ctx,{success:true})
            })
          } else if(method.delete) {
            addHelp(port,path,'DELETE')
            console.info(`DELETE : http://localhost:${port}${path}`)
            router.delete(path,async (ctx)=>{
              var paras = ctx.request.body
              resouce.sync(data=>{
                return {}
              })
              setRightResult(ctx,{success:true})
            })
          }
        })
    }
    else{
      //here is  code 
      //{"get":"@get"},{"put","@put"},{"post":"@post"},{"delete":"@del"}
      meta.methods.forEach(method=>{
         //todo get
         if(method.get){
          addHelp(port,path,'GET')
          console.info(`GET : http://localhost:${port}${path}`)
          
          var fn = method.get != '@value' ? meta.value[method.get] :meta.value
          router.get(path, async (ctx, next)=>{
            //ctx.body = "hello"
          var data = await new Promise((r,j)=>{
              if(utils.Type.isAsyncFunction(fn)){
                  r(fn(ctx.query))
              } else if (utils.Type.isFunction(fn)){
                  r(fn(ctx.query))
              }
              else{
                r(fn)
              }
            })
            setRightResult(ctx,data)
           })
         } else if (method.put){
          addHelp(port,path,'PUT')
          console.info(`PUT : http://localhost:${port}${path}`)
          var fn = meta.value[method.put]
          router.put(path, async (ctx, next)=>{
            var data = await new Promise((r,j)=>{
               if(utils.Type.isAsyncFunction(fn)){
                   r(fn(ctx.request.body))
               } else if (utils.Type.isFunction(fn)){
                   r(fn(ctx.request.body))
               }
               else{
                 r(fn)
               }
             })
             setRightResult(ctx,data)
          })
         }else if (method.post){
          addHelp(port,path,'POST')
          console.info(`POST : http://localhost:${port}${path}`)
          var fn = meta.value[method.post]
          router.post(path, async (ctx, next)=>{
            var data = await new Promise((r,j)=>{
               if(utils.Type.isAsyncFunction(fn)){
                   r(fn(ctx.request.body))
               } else if (utils.Type.isFunction(fn)){
                   r(fn(ctx.request.body))
               }
               else{
                 r(fn)
               }
             })
             setRightResult(ctx,data)
          })
         }else if (method.delete){
          addHelp(port,path,'DELETE')
          console.info(`DELETE : http://localhost:${port}${path}`)
          var fn = meta.value[method.delete]
          router.delete(path, async (ctx, next)=>{
            var data = await new Promise((r,j)=>{
               if(utils.Type.isAsyncFunction(fn)){
                   r(fn(ctx.request.body))
               } else if (utils.Type.isFunction(fn)){
                   r(fn(ctx.request.body))
               }
               else{
                 r(fn)
               }
             })
             setRightResult(ctx,data)
          })
         }
      })
    }
}

exports.up =(metas,options) =>{
    options =options || {}
    options.port = options.port || 11540
    options.nocors = options.nocors || false
    port = options.port

    //cors
    if(!options.nocors){
      app.use(cors({}))
    }

    metas.forEach(meta => {
        registerRouter(router,meta)
    });

    if(!options.list){
      app.use(router.routes())
      .use(router.allowedMethods())
      app.listen(options.port)
      console.info(`web started : http://localhost:${options.port}/`)
    }
    
}

exports.mount = (resourcePath,staticPath,options)=>{
    options =options || {}
    options.port = options.port || 11540
    options.nocors = options.nocors || false
    port = options.port

    metaMan.get(resourcePath).then(metas=>{
       exports.up(metas,options)

       if(!options.list){
        if(staticPath)
        {
         console.log('mount static dir: ' + staticPath)
         app.use(static(staticPath))
        }
       }
    })

} 

exports.list = (resourcePath,staticPath,options)=>{
  options = options|| {}
  options.list =true
  exports.mount(resourcePath,staticPath,options)
}

exports.test = test