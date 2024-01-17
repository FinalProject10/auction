const Products=require('../models/items.js')
const createProduct=(req,res)=>{
     Products.create(req.body).then((data)=>{
        res.status(200).send(data)
     }).catch((err)=>{
        console.log(err.message)
     })
}
module.exports.createProduct=createProduct