# aok.js
reverse the koa

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

## what is aok

<div align=center><img src="https://raw.githubusercontent.com/apporoad/aok.js/master/docs/aok.js.png"/></div>  

## use

### cli
```bash
npm i -g aok.js

aok -h 

aok [yourDir] -s [yourStaticDir] -p [yourport]

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