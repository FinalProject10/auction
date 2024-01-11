const Admin=require('../models/admin')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const secretKey="salim123"

module.exports={
    register:async(req,res)=>{
        try{
        const {name,lastName,email,password}=req.body
        let a=await Admin.findOne({where:{email}})
        if(a){
            return res.status(404).json({err:"email in use"})
        }
        const hashed= await bcrypt.hash(password,10)
        let d=await Admin.create({
            name,
            lastName,
            email,
            password:hashed,
            
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
        let user=await Admin.findAll({where:{email}})
        console.log(user)
        if(user.length===0){
          return res.status(404).json('user not found')
        }
        if(user){
          const hashed=await bcrypt.compare(password,user[0].password)
          if(hashed){
              const token=jwt.sign({id:user[0].id,role:'admin'},secretKey,{expiresIn:'24h'})
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
          let d=await Admin.findAll({where:{id:req.id} })
          res.status(200).json(d)
      }
  }catch(err){
      res.status(500).json({err:'server err'})
  }
  }
}