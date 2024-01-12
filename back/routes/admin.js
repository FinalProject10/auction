const adminRouter=require('express').Router()
const adminContr=require('../controllers/admin')
const mid=require('../middleware/middleware')
adminRouter.post('/register',adminContr.register)
adminRouter.post('/login',adminContr.login)
adminRouter.get('/home',mid.verifyTokenClient,adminContr.getHome)






module.exports=adminRouter