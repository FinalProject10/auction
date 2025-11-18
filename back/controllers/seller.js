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
            
            // Validate input
            if (!email || !password) {
              return res.status(400).json({ message: "Email and password are required" });
            }

            // Check database connection
            const db = require("../database/index");
            try {
              await db.authenticate();
            } catch (dbError) {
              console.error("Database connection error:", dbError);
              return res.status(500).json({ message: "Database connection failed. Please check your database configuration." });
            }

            // Find user
            let user=await Seller.findOne({where:{email}})
            
            if(!user){
              return res.status(404).json({ message: "User not found. Please check your email or sign up as a seller." });
            }
            
            if(!user.batinda || !user.cinNum){
              return res.status(400).json({ message: "Seller profile incomplete. CIN and Batinda are required." });
            }
            
            const hashed=await bcrypt.compare(password,user.password)
            if(!hashed){
              return res.status(401).json({ message: "Incorrect password. Please try again." });
            }
            
            const token=jwt.sign({id:user.id,role:'seller'},secretKey,{expiresIn:'24h'})
            console.log("✓ Seller login successful:", user.email);
            return res.status(200).json({ 
              token,
              user: {
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                email: user.email
              }
            });
        
        }catch(err){
            console.error("Seller login error:", err);
            return res.status(500).json({ message: "Internal server error. Please try again later." });
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


