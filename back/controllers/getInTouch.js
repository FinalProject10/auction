const GetInTouch = require('../models/getInTouch.js')
function postSomethingToUs(req,res){
    GetInTouch.create(req.body).then((data)=>{
        
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(500).send(err.message)
    })
}
function getYourFeeds(req,res){
    GetInTouch.findAll({}).then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(500).send(err.message)
    })
} 
module.exports={postSomethingToUs,getYourFeeds}