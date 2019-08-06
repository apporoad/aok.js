const koa = require("koa")
const Router = require("koa-router")

const app = new koa()
const router = new Router()


router.get("/",(ctx , next)=>{

    ctx.body = "hello"
})

app.use(router.routes())
    .use(router.allowedMethods())

app.listen(3000)


/**
 * get resource meta data in one dir
 * 
 * aPath : resource path
 * sPath : static resouce Path
 */
exports.getResourceMeta = (aPath,sPath) => {

}