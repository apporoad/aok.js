# aok.js
reverse the koa , ROP resource oriented program, another implement like json-server and more than it

## phil(哲学)

[phil](./phil.md)

## what can we do with aok.js
1. build your http api with your js file in seconds
2. build your static website with few backend apis : [pnote](https://github.com/apporoad/pnote)
3. share your excel data to any other systems : [csv.aok](https://github.com/apporoad/csv.aok)
4. build your own program just with few files just like all aok projects
5. extends aok just for your needs : [how to extend](docs/ext.md)
6. add a file upload server in seconds : [how](https://github.com/apporoad/dmodule.js/blob/05fa91578d23a8ee6bc128f153aa933f32358514/api/meta.js#L65)

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

4. 文件上传支持

    采用koa-body方式上传文件，ctx.request.files直接获取

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


## how to debug
推荐做法是直接采用本地引用，直接调用方式  
一些情况必须启动aok，vscode 采用如下配置方式：  
```json
{
    "program": "/usr/local/bin/aok",
    "args": ["${workspaceFolder}/api" , "-p" ,"10000"]
}

```

## examples
1. [pnote](https://github.com/apporoad/pnote)
2. [apinfo](https://github.com/apporoad/apinfo.js)
3. [dmodule](https://github.com/apporoad/dmodule.js)
4. [danmu.js](https://github.com/apporoad/LiSA.danmu.js)
5. adding