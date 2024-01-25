const Client=require('../models/clients')
const Admin = require('../models/admin')
const Seller= require("../models/sellers")
const Item =require ('../models/items')
const Membership=require('../models/memberships')
const Reclamation = require('../models/reclamation')
const bid =require ('../models/bid')

const Items = require('../models/items')
const Bid = require('../models/bid')
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
      raw: true 
    });

    
    const bidAmounts = result.map(item => item.bidAmount);

    res.status(200).json(bidAmounts);
  } catch (error) {
    console.error(error); 
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
module.exports.getCord = (req, res) => { 
  Seller.findAll({
    attributes: ['name','lastName','image'],
    include: [
      {
        model: Item,
        attributes: ['name', 'images','price']
      },
    
    ],
  })
    .then((sellersWithItems) => {
      if (!sellersWithItems) {
        res.status(404).json({ error: 'No sellers found' });
        return;
      }
      const result = sellersWithItems.map((seller) => ({
        seller: seller.get(),
      }));

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

module.exports.cantBid = async (req, res) => {
  try {
    const cl = await Client.findAll({
      include: [
        {
          model: Membership,
          where: {
            type: 'free'
          },
          required: true
        }
      ],
      raw: true 
    });

    res.status(200).json(cl);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Internal Server Error',details: error.message });
  }
};
module.exports.canBid = async (req, res) => {
  try {
    const cl = await Client.findAll({
      include: [
        {
          model: Membership,
          where: {
            type: 'basic'
          },
          required: true
        }
      ],
      raw: true 
    });

    res.status(200).json(cl);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Internal Server Error',details: error.message });
  }
};
module.exports.remove = async (req, res) => {
  try {
    const result = await Client.destroy({
      where: { id: req.params.id } 
    });

    if (result) {
      res.status(200).send('User deleted');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error); 
    res.status(500).send(error.message);
  }
};
module.exports.removePro = async (req, res) => {
  try {
    const result = await Item.destroy({
      where: { id: req.params.id } 
    });

    if (result) {
      res.status(200).send('product deleted');
    } else {
      res.status(404).send('product not found');
    }
  } catch (error) {
    console.error(error); 
    res.status(500).send(error.message);
  }
};
module.exports.vip = async (req, res) => {
  try {
    const cl = await Client.findAll({
      include: [
        {
          model: Membership,
          where: {
            type: 'vip'
          },
          required: true
        }
      ],
      raw: true 
    });

    res.status(200).json(cl);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Internal Server Error',details: error.message });
  }
};
module.exports.addRec = async (req, res) => {
  const {message, ClientId} = req.body;

  try {
      const newReclamation = await Reclamation.create({
        message, 
        ClientId
      });

      res.json({ Reclamation: newReclamation });
  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
};
module.exports.getRec = async (req, res) => {
  try {
    const cl = await Reclamation.findAll({
      include: [
        {
          model: Client,
          attributes: ['name','lastName','image','email']
        }
      ], 
    });

    res.status(200).json(cl);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Internal Server Error',details: error.message });
  }
};
module.exports.getAllProduct= async(req,res)=>{
  try {
    const pr = await Item.findAll()


    res.json(pr)
  }catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}
module.exports.removerec = async (req, res) => {
  try {
    const re = await Reclamation.destroy({
      where: { id: req.params.id } 
    });

    if (re) {
      res.status(200).send('reclamation deleted');
    } else {
      res.status(404).send('reclamation not found');
    }
  } catch (error) {
    console.error(error); 
    res.status(500).send(error.message);
  }
};
module.exports.removeSel = async (req, res) => {
  try {
    const sel = await Seller.destroy({
      where: { id: req.params.id } 
    });

    if (sel) {
      res.status(200).send('seller deleted');
    } else {
      res.status(404).send('seller not found');
    }
  } catch (error) {
    console.error(error); 
    res.status(500).send(error.message);
  }
};
module.exports.getOne = async (req, res) => {
  try {
    const one = await Seller.findAll({
      attributes: ['name', 'lastName', 'image','cinNum','address','telNumb'],
      include: [
        {
          model: Item,
          attributes: ['name', 'images', 'price']
        },
      ],
      where: { id: req.params.id }
    });

    if (one.length > 0) {
      // Send the 'one' object as the response
      res.status(200).json(one);
    } else {
      res.status(404).send('Seller not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
module.exports.getBid = async (req, res) => {
  try {
    const one = await Bid.findAll({
      include: [
        {
          model: Client,
        },
      ],
      where: { id: req.params.id }
    });

    if (one.length > 0) {
      // Send the 'one' object as the response
      res.status(200).json(one);
    } else {
      res.status(404).send('Seller not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};