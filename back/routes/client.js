const clientRouter=require('express').Router()
const clientContr=require('../controllers/client')
const mid=require('../middleware/middleware')
clientRouter.post('/register',clientContr.register)
clientRouter.post('/login',clientContr.login)
clientRouter.get('/home',mid.verifyTokenClient,clientContr.getHome)
clientRouter.put('/update/:id',clientContr.updateProfileClient)
clientRouter.put('/updateMem/:id',clientContr.updateMembership)




module.exports=clientRouter