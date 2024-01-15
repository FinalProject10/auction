const dashboardRouter=require('express').Router()
const dashctr=require('../controllers/adminDashboard')


dashboardRouter.post('/addAdmin',dashctr.addAdmin)
dashboardRouter.post('/addPro',dashctr.addpro)
dashboardRouter.get('/het',dashctr.getAlClient)
dashboardRouter.get('/getsel',dashctr.getAllSeller)
dashboardRouter.get('/getPro',dashctr.getProduct)
dashboardRouter.get('/getMember',dashctr.getMembership)
dashboardRouter.get('/getReclam',dashctr.getRec)

module.exports=dashboardRouter