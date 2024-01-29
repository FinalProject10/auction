const Seller=require('../models/sellers')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const secretKey="salim123"
module.exports={
    registerSec:async(req,res)=>{
        try{
        const id=req.params.id
        const {batinda,cinNum}=req.body
        
            let r=await Seller.update({
                batinda,
                cinNum
            },{where:{id}})
           return res.status(201).json(r)
        
        }catch(err){
            res.status(500).json('serv err')
        }
    },
    register:async(req,res)=>{
        try{
        const {name,lastName,email,password,phone}=req.body
        if((phone).toString().length!==8){
            return res.status(404).json({err:"phone number not valid"})
        }
        if(password.length<8||(!password.includes('#') && !password.includes('@') && !password.includes('?'))){
            return res.status(404).json({err:"password is weak"})
        }
        let a=await Seller.findOne({where:{email}})
        if(a){
            return res.status(404).json({err:"email in use"})
        }

        const hashed= await bcrypt.hash(password,10)

        let d=await Seller.create({
            name,
            lastName,
            email,
            password:hashed,
            telNumb:phone,
            
        })
        res.status(200).json({
        name:d.name,
        lastName:d.lastName,
        email:d.email,
        id:d.id
      })
    }
catch(err){
res.status(500).json(err)
}
},
        login:async(req,res)=>{
          try{
            const {email,password}=req.body
          let user=await Seller.findAll({where:{email}})
          console.log(user)
          if(user.length===0){
            return res.status(404).json('user not found')
          }
          if(user){
            if(!user[0].batinda || !user[0].cinNum){
                return res.status(404).json('cin or batinda needed')
            }
            const hashed=await bcrypt.compare(password,user[0].password)
            if(hashed){
                const token=jwt.sign({id:user[0].id,role:'seller'},secretKey,{expiresIn:'24h'})
               return res.status(200).json(token)
            }
            return res.status(404).json('password is incorrect')
          }
        
        
        }catch(err){
            res.status(500).json(err)
        }
},
    getHome:async(req,res)=>{
        try{
        if(!req.id){
            return res.status(404).json({err:'err'})
        }
        if(req.id){
            let d=await Seller.findAll({where:{id:req.id} })
            res.status(200).json(d)
        }
    }catch(err){
        res.status(500).json({err:'server err'})
    }
    },
    updateProfile: async(req,res)=>{
        const hashed=await bcrypt.hash(req.body.newPass,10)
        Seller.update({name:req.body.name,lastName:req.body.lastName,email:req.body.email,newPass:hashed},{where:{id:req.params.id}}).then((data)=>{
            res.status(200).send(data)
        }).catch((err)=>{res.status(500).send(err.message)})
    }
}


