const express=require('express')
const ProductsRouter=express.Router()
const productsControllers=require('../controllers/products.js')
ProductsRouter.post("/post",productsControllers.createProduct)
module.exports=ProductsRouter
