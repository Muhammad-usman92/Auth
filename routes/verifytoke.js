const jwt=require("jsonwebtoken");
module.exports= function (req,res,next){
    const token=req.header("Token")

    if(!token) return res.status(400).send("access Denied");

    try{
        const verified=jwt.verify(token,"dfhdfhdhfkjh");
        req.user=verified;
        res.status(200).json({
            success: true,
			data: [req.user],

        })
        // next();
    }
    catch(err){
        res.status(404).send("invalid token")

    }
}