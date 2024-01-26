const Items = require("../models/items");
const Seller = require("../models/sellers");
const Bids = require("../models/bid");
const geBid = async (req, res) => {
  const itemId = req.params.itemId;
  const page = req.query.page || 1;
  const pageSize = 10;

  try {
    const bids = await Bids.findAndCountAll({
      where: { itemId },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const totalPages = Math.ceil(bids.count / pageSize);

    res.status(200).json({
      bids: bids.rows,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: bids.count,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getItems = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const items = await Items.findAll({
      where: { id: itemId },
      include: [
        {
          model: Seller,
          as: "seller",
          attributes: [
            "id",
            "name",
            "lastName",
            "image",
            "telNumb",
            "longitude",
            "latitude",
            "address",
          ],
        },
        { model: Bids, as: "bids" },
      ],
    });

    // console.log(items);
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const addItem = async (req, res) => {
  Items.create(req.body).then((data)=>{
    res.status(200).send(data)
  }).catch(error=>res.status(500).send(error.message))
};
const editItem=(req,res) =>{
  Items.update(req.body,{where:{id:req.params.id}})
  .then((data)=>{res.status(200).send(data)})
  .catch((err)=>{res.status(500).send(err)})
}
const getAll = async (req, res) => {
  try {
    const d = await Items.findAll();
    res.status(200).json(d);
  } catch (err) {
    res.status(500).json("server err");
  }
};
const getAllItems = async (req, res) => {
  const itemsPerPage = 8;
  const page = parseInt(req.query.page, 10) || 1;

  try {
    const offset = (page - 1) * itemsPerPage;
    const items = await Items.findAll({
      limit: itemsPerPage,
      offset: offset,
    });

    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};
const getItemsBided = async (req, res) => {
  try {
    let d = await Items.findAll({
      include: [
        {
          model: Bids,
          where: { ClientId: req.params.id },
          attributes: [],
        },
      ],
    });
    if (d) return res.status(200).json(d);
    return res.status(404).json("404");
  } catch (err) {
    res.status(500).json("internal err");
  }
};
module.exports = {
  getItems,
  addItem,
  getAllItems,
  getAll,
  getItemsBided,
  geBid,
  editItem
};
