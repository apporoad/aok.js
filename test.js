
//require("./meta").test()

//require('./index').test()


require('./index').mount(__dirname+'/demo', __dirname+'/docs' , {ext : true})

// require('./cleanup').Cleanup(()=>{console.log('acb')})

// setInterval(() => {
//     console.log('aa')
// }, 500);