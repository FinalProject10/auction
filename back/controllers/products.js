const Products=require('../models/items.js')
const createProduct=(req,res)=>{
     Products.create(req.body).then((data)=>{
        res.status(200).send(data)
     }).catch((err)=>{
        console.log(err.message)
     })
}
const getAll=(req,res)=>{
   Products.findAll({}).then((data)=>{
      res.status(200).send(data)
   }).catch(err=>res.status(500).send(err.message))
}
module.exports={createProduct,getAll}