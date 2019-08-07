const koa = require("koa")
const Router = require("koa-router")
const metaMan =require('./meta')
const utils = require('lisa.utils')

const app = new koa()
const router = new Router()

var port = 10000

var test = ()=>{

    //todo

    exports.up([
      { type: 'static',
          srcPath:  __dirname+'/demo/easy.json',
          name: 'easy',
          methods: [ {get:"@value"},{post : "@value"},{put:"@value"},{delete:"@dvalue"} ] 
      }
    ])
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

const handleResult = (meta,method,ctx,params)=>{
    var handler = null
    //json
    if(utils.endWith('.json')){
        if(method.get){
            handler = ()=>{
                //todo
                return ''}
        }
    }else{

    }
}

const registerRouter= (router,meta)=>{
    var path = getPath(meta.name)

    //json 
    if(utils.endWith(meta.srcPath,'.json')){
       meta.methods.forEach(method=>{

        // todo here to do json.js first
          if(method.get){
              console.info(`GET : http://localhost:${port}${path}`)
              router.get(path,async (ctx)=>{
                  //param  ctx.query
                  console.log(ctx.query)
                  handleResult(meta,method,ctx ,ctx.query)
              })
          }
        })
    }
    else{
      //here is  code 
    }
 
}

exports.up =(metas,options) =>{
    options =options || {}
    options.port = options.port || 11540
    port = options.port

    metas.forEach(meta => {
        registerRouter(router,meta)
    });
    app.use(router.routes())
        .use(router.allowedMethods())
    app.listen(options.port)
    console.info(`web started : http://localhost:${options.port}/`)
}

exports.mount = (resourcePath,options)=>{
    options =options || {}
    options.port = options.port || 11540
    port = options.port

    metaMan.get(resourcePath).then(metas=>{
       exports.up(metas,options)
    })
} 

exports.test = test