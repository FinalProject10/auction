const Seller = require("../models/sellers");

const getAllSeller = async (req, res) => {
  try {
    const data = await Seller.findAll({});
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findByPk(req.params.itemId);
    if (seller) {
      res.status(200).send(seller);
    } else {
      res.status(404).send('Seller not found');
    }
  } catch (error) {
    console.error('Error fetching seller by ID:', error);
    res.status(500).send(error.message);
  }
};

module.exports = { getAllSeller, getSellerById };
