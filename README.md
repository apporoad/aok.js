# aok.js
reverse the koa

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