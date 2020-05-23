# aok.js
reverse the koa , ROP resource oriented program

## phil(哲学)

[phil](./phil.md)

## about version 

v2.0.0 
1. add .aokignore just like .gitignore
2. add clis for aok like:


## just step by step to understand aok

```bash
npm i -g aok.js

mkdir temp
cd temp

cat << EOF > data.json
{
    "hello":"good good day"
}
EOF

aok . 

# try  visit by http
#GET : http://localhost:11540/data?node=hello
#POST : http://localhost:11540/data
#PUT : http://localhost:11540/data?node=
#DELETE : http://localhost:11540/data?node=
```

## what is aok

<div align=center><img src="https://raw.githubusercontent.com/apporoad/aok.js/master/docs/aok.js.png"/></div>  
参数说明：

1. 暴露出去的资源方法，同时支持同步及异步方法

   ```js
   {
       "@get" : (params , ctx , options) =>{
           // return {}
           // return []
           return Promise.resolve(1)
       },
       "@post" : async (params , ctx , options) =>{
           // return {}
           // return []
           return Promise.resolve(1)
       }
   }
   ```

   

2. 也支持其他形式

   ```js
   {
       "@delete" :  'test delete success',
       "@put" : {
           hello : 'good good day'
       }
   }
   ```

3. 方法参数说明

   params ： get时 ctx.query  其他methods 时 取 ctx.request.body

   ctx ： 请求上下文

   options : 程序启动的options，应用直接获取做一些特殊处理

   options.server : 即koa的server， options.server.close() 关闭应用

## use

### cli
```bash
npm i -g aok.js

aok -h 

aok [yourDir] -s [yourStaticDir] -p [yourport]

```

### amazing using
```bash
npm i -g lisa.dl

aok https://github.com/apporoad/aok.js/blob/master/example/example.zip?raw=true --type zip

# more in aok -h

aok https://github.com/apporoad/pnote.git --type git -r api -s static -w pnote -d

```

### code
```bash
npm i --save aok.js
```
```js
const aok = require('aok.js')

aok.mount('yourDirPath', 'yourStaticDirPath',{ port:11540})

```

## how to debug
debug use [debug](https://www.npmjs.com/package/debug)
```bash
# LINUX
DEBUG=* aok xxx xxx

#windows powershell
$env:DEBUG = "*,-not_this"
```
## how to deploy
```bash
npm i -g pm2
npm i -g aok.js

pm2 start --name yourApp aok -- . -p 11540

```


## ps
```
we use '_any_' as '*' with your fileName

you can : 
_any_.js => /*
abc/_any_.js => /abc/*

```

```
// .json support  json node operations

you can :

GET http://localhost:11540/?node=abc.hello
PUT http://localhost:11540/?node=abc.hello
DELETE http://localhost:11540/?node=abc.hello

just try it

```

## docker
[jump](./docs/docker.md)