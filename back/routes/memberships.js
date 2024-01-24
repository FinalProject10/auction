const memRoute=require('express').Router()
const memCont=require('../controllers/memberships')
memRoute.get('/getOne/:id',memCont.getOne)
memRoute.post('/add',memCont.add)

module.exports =memRoute