const Client=require('../models/clients')
const Admin = require('../models/admin')
const Seller= require("../models/sellers")
const Item =require ('../models/items')
const Membership=require('../models/memberships')
const Reclamation = require('../models/reclamation')
const bid =require ('../models/bid')
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
    const result = await bid.findAll({
      attributes: ['bidAmount'],
      include: [
        {
          model: Item,
          where: {
            sold: true
          },
          required: true
        }
      ],
      raw: true // Ensure the result is in raw format to simplify processing
    });

    // Extract only the bidAmount from the result
    const bidAmounts = result.map(item => item.bidAmount);

    res.status(200).json(bidAmounts);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

module.exports.getMembership = async (req, res) => { 
  try {
    const Mem = await Membership.findAll({
      attributes: ['price'],
    });

    res.json(Mem);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}


module.exports.getRec = async (req, res) => { 
    try {
      const rec = await Reclamation.findAll();
  
      res.json(rec);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  };
  module.exports.addpro = async (req, res) => {
    const { images,
      name, 
      price, 
      timeStart , 
      timeEnd , 
      reviews ,
      views ,
      watching,
      description,
      longitude ,
      latitude ,
      sold ,
      body ,
      climatisation ,
      cubicCapacity ,
      emissionClass ,
      mileage ,
      parkingSensors ,
      airbags ,
      color ,
      doorCount ,
      gearBox ,
      numberOfSeats ,
      power , sellerId} = req.body;
    try {
        const newItem = await Item.create({
 images,
name, 
price, 
timeStart , 
timeEnd , 
reviews ,
views ,
watching,
description,
longitude ,
latitude ,
sold ,
body ,
climatisation ,
cubicCapacity ,
emissionClass ,
mileage ,
parkingSensors ,
airbags ,
color ,
doorCount ,
gearBox ,
numberOfSeats ,
power ,
sellerId:sellerId
            
        });

        res.json({ Item: newItem });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

module.exports.getCord = (req, res) => { 
  Seller.findAll({
    attributes: ['id', 'name', 'image'],
    include: [
      {
        model: Item,
        attributes: ['name', 'images'],
      },
    ],
  })
    .then((sellersWithItems) => {
      // Check if sellersWithItems is defined
      if (!sellersWithItems) {
        res.status(404).json({ error: 'No sellers found' });
        return;
      }

      // Access the results
      const result = sellersWithItems.map((seller) => ({
        seller: seller.get(),
        items: seller.Items ? seller.Items.map(item => item.get()) : [],
      }));

      // Send the result as a response
      res.json(result);
    })
    .catch((error) => {
      console.error('Database Query Error:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    });
};

module.exports.getAllPro = async (req, res) => { 
  try {
    const prr = await Item.findAll();

    res.json(prr);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};