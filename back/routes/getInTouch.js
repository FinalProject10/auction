const controllers = require('../controllers/getInTouch.js')
const express = require('express')
const router=express.Router()
router.get('/',controllers.getYourFeeds)
router.post('/postSomething',controllers.postSomethingToUs)
module.exports=router