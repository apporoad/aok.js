


module.exports={
    "@get" : async (params,ctx,options)=>{
        return await new Promise((r,j)=>{
            setTimeout(() => {
                r("here GET /")
            }, 500);
        })
    },
    "@put" : function(params,ctx){
        return {success : true, msg : "add succed"}
    },
    "@post" : function(params,ctx){
        if(ctx.request.files){
            
            // console.log('files count : '  + ctx.request.files.length)
        }
        return {success : true, msg : "edit right"}
    },
    "@delete" : function(params){
        return {success :true , msg : "deleted"}
    },
    "hello" : {
        "@get" : function(){ return "good good day"}
    }
}