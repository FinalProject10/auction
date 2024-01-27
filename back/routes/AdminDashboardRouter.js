const dashboardRouter=require('express').Router()
const dashctr=require('../controllers/adminDashboard')


dashboardRouter.post('/addAdmin',dashctr.addAdmin)
// dashboardRouter.post('/addPro',dashctr.addpro)
dashboardRouter.post('/rec',dashctr.addRec)
dashboardRouter.get('/het',dashctr.getAlClient)
dashboardRouter.get('/getsel',dashctr.getAllSeller)
dashboardRouter.get('/getPro',dashctr.getProduct)
dashboardRouter.get('/getMember',dashctr.getMembership)
dashboardRouter.get('/getReclam',dashctr.getRec)
dashboardRouter.get('/SelItem',dashctr.getCord)
dashboardRouter.get('/getAll',dashctr.getAllPro)
dashboardRouter.get('/cantBid',dashctr.cantBid)
dashboardRouter.get('/canBid',dashctr.canBid)
dashboardRouter.delete('/remove/:id',dashctr.remove)
dashboardRouter.delete('/removeSel/:id',dashctr.removeSel)
dashboardRouter.delete('/removeProduct/:id',dashctr.removePro)
dashboardRouter.delete('/removeRec/:id',dashctr.removerec)
dashboardRouter.get('/vip',dashctr.vip)
dashboardRouter.get('/getAllProduc',dashctr.getAllProduct)
dashboardRouter.get('/getOne/:id',dashctr.getOne)
dashboardRouter.get('/getbid/:id',dashctr.getBid)



module.exports=dashboardRouter