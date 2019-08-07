


module.exports={
    "@get" : async (params)=>{
        return await new Promise((r,j)=>{
            setTimeout(() => {
                r("here GET /")
            }, 500);
        })
    },
    "@put" : function(params){
        return {success : true, msg : "add succed"}
    },
    "@post" : function(params){
        return {success : true, msg : "edit right"}
    },
    "@delete" : function(params){
        return {success :true , msg : "deleted"}
    },
    "hello" : {
        "@get" : function(){ return "good good day"}
    }
}