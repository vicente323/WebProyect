const jwt=require("jsonwebtoken");


function auth(req,res,next){

        let token= req.get('UserAuth')
        if(token){

                jwt.verify(token,"DASW",(err,payload)=>{


                    if(err){
                        res.status(401).send({error:err.name})
                        return
                    }
                    else{


                        console.log(payload);
                        req.email=payload.email;
                        req.username=payload.username;
                        next();
                    }

                })

        }
        else{
             res.status(401).send({error:"No autentificado"})
        }
}