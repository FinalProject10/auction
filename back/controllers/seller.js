const Seller=require('../models/sellers')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const secretKey="salim123"
module.exports={
    register:async(req,res)=>{
        try{
        const {name,lastName,email,password,phone,cinNum,batinda}=req.body
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
            cinNum,
            batinda
        })
        res.status(201).json({
        name:d.name,
        lastName:d.lastName,
        email:d.email
      })
    }
catch(err){
res.status(400).json(err)
}
},
        login:async(req,res)=>{
          try{
            const {email,password}=req.body
          let user=await Seller.findAll({where:{email}})
          if(user){
            const hashed=await bcrypt.compare(password,user[0].password)
            if(hashed){
                const token=jwt.sign({id:user[0].id,role:'seller'},secretKey,{expiresIn:'24h'})
               return res.status(200).json(token)
            }
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
    updateProfile: (req,res)=>{
        Seller.update({name:req.body.name,lastName:req.body.lastName},{where:{id:req.params.id}}).then((data)=>{
            res.status(200).send(data)
        }).catch((err)=>{res.status(500).send(err.message)})
    }
}