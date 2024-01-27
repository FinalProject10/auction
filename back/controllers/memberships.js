const Memberships =require('../models/memberships')
module.exports={
    getOne:async(req,res)=>{
        try{
        let d=await Memberships.findAll({where:{ClientId:req.params.id}})
        if (d) return res.status(200).json(d)
        return res.status(404).json('err')
    }
        catch(err){
            res.status(500).json('internal error')

    }
},
    add:async(req,res)=>{
        try{
            const {type,price,id}=req.body
            let d=await Memberships.create({type,price},{where:{ClientId:id}})
           if(d) return res.status(200).json(d)
           return res.status(404).json('not created')
        }
        catch(err){
            res.status(500).json('internal error')
        }
    }
}