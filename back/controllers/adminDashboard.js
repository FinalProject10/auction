const Client=require('../models/clients')
const Seller= require("../models/sellers")
const Item =require ('../models/items')
const Membership=require('../models/memberships')
const Reclamation = require('../models/reclamation')
module.exports.addAdmin = async (req, res) => {
    const { name, password, email, lastName, image, telNumb, cinNum } = req.body;

    try {
        console.log(req.body);

        const newAdmin = await Admin.create({
            name: name,
            password: password,
            email: email,
            lastName: lastName,
            image: image,
            telNumb: telNumb,
            cinNum: cinNum
        });

        res.json({ Admin: newAdmin });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};
module.exports.getAlClient = async (req, res) => { 
  console.log("req", Client)
  try {
    const clien = await Client.findAll({});

    res.json(clien);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
module.exports.getAllSeller = async (req, res) => { 
  try {
    const sel = await Seller.findAll({});

    res.json(sel);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
module.exports.getProduct = async (req, res) => { 
  try {
    const ite = await Item.findAll({});

    res.json(ite);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
module.exports.getMembership = async (req, res) => { 
  try {
    const Mem = await Membership.findAll({});

    res.json(Mem);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
module.exports.getRec = async (req, res) => { 
    try {
      const rec = await Reclamation.findAll({});
  
      res.json(rec);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  };
  module.exports.addpro = async (req, res) => {
    const { images,name ,price , timeStart ,timeEnd ,reviews,views,watching ,description,longitude ,lattitude ,sold ,sellers_id  } = req.body;

    try {
        console.log(req.body);

        const newItem = await Item.create({
            images,
            name  ,
            price  ,
            timeStart  ,
            timeEnd  ,
            reviews,
            views  ,
            watching,
            description ,
            longitude ,
            lattitude,
            sold  ,
            sellers_id
        });

        res.json({ Item: newItem });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};