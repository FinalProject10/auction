const cloudinaryUpload = require('../cloudinary/cloudinary')
const cloudRoute=require('express').Router()
cloudRoute.post('/get',cloudinaryUpload)
module.exports=cloudRoute