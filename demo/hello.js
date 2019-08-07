module.exports={
    "@get" : async (params)=>{
        return await new Promise((r,j)=>{
            setTimeout(() => {
                r("here GET /")
            }, 500);
        })
    }
}