const jwt=require('jsonwebtoken')
const secretKey='salim123'
const verifyTokenSeller=(req,res,next)=>{
const header=req.headers[`authorization`]
const token=header.split(' ')[1]
    if(!token){
        return res.status(400).json({err:'no token'})
    }
    jwt.verify(token,secretKey,(err,user)=>{
        if(err){
            req.id=undefined
            return
        }
        if(user.role==="seller"){
            req.id=user.id
        }
       
        
    })
    next()
}
const verifyTokenClient=(req,res,next)=>{
    const header=req.headers[`authorization`]
    const token=header.split(' ')[1]
        if(!token){
            return res.status(400).json({err:'no token'})
        }
        jwt.verify(token,secretKey,(err,user)=>{
            if(err){
                req.id=undefined
                return
            }
            if(user.role==="client"){
                req.id=user.id
            }
           
            
        })
        next()
    }
    const verifyTokenAdmin=(req,res,next)=>{
        const header=req.headers[`authorization`]
        const token=header.split(' ')[1]
            if(!token){
                return res.status(400).json({err:'no token'})
            }
            jwt.verify(token,secretKey,(err,user)=>{
                if(err){
                    req.id=undefined
                    return
                }
                if(user.role==="admin"){
                    req.id=user.id
                }
               
                
            })
            next()
        }

module.exports={
    verifyTokenSeller,
    verifyTokenClient,
    verifyTokenAdmin
}