// Import models from relations to ensure associations are loaded
const { Items, Seller, Bid } = require("../models/relations");
const Bids = Bid; // Keep Bids alias for compatibility
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
    const item = await Items.findOne({
      where: { id: itemId },
      include: [
        {
          model: Seller,
          as: "seller",
          required: false, // LEFT JOIN - don't fail if seller doesn't exist
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
        { 
          model: Bid, 
          as: "bids",
          required: false, // LEFT JOIN - don't fail if no bids exist
        },
      ],
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Parse images JSON if they're strings
    const itemData = item.toJSON();
    if (itemData.images) {
      if (typeof itemData.images === 'string') {
        try {
          itemData.images = JSON.parse(itemData.images);
        } catch (e) {
          // If parsing fails, wrap in array
          itemData.images = [itemData.images];
        }
      }
      // Ensure it's always an array
      if (!Array.isArray(itemData.images)) {
        itemData.images = [itemData.images];
      }
    } else {
      itemData.images = [];
    }

    res.status(200).json(itemData);
  } catch (error) {
    console.error("Error fetching item:", error);
    console.error("Error stack:", error.stack);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      itemId: itemId
    });
    res
      .status(500)
      .json({ 
        message: "Internal server error", 
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
  }
};
const addItem = async (req, res) => {
  try {
    const d = await Items.create(req.body);
    res.status(200).json("created");
  } catch (err) {
    res.status(500).json("server err");
  }
};
const getAll = async (req, res) => {
  try {
    const items = await Items.findAll();
    
    // Parse images JSON if they're strings
    const parsedItems = items.map(item => {
      const itemData = item.toJSON();
      if (itemData.images) {
        if (typeof itemData.images === 'string') {
          try {
            itemData.images = JSON.parse(itemData.images);
          } catch (e) {
            itemData.images = [itemData.images];
          }
        }
        if (!Array.isArray(itemData.images)) {
          itemData.images = [itemData.images];
        }
      } else {
        itemData.images = [];
      }
      return itemData;
    });
    
    res.status(200).json(parsedItems);
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

    // Parse images JSON if they're strings
    const parsedItems = items.map(item => {
      const itemData = item.toJSON();
      if (itemData.images) {
        if (typeof itemData.images === 'string') {
          try {
            itemData.images = JSON.parse(itemData.images);
          } catch (e) {
            itemData.images = [itemData.images];
          }
        }
        if (!Array.isArray(itemData.images)) {
          itemData.images = [itemData.images];
        }
      } else {
        itemData.images = [];
      }
      return itemData;
    });

    res.status(200).json(parsedItems);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};
const getItemsBided = async (req, res) => {
  try {
    let items = await Items.findAll({
      include: [
        {
          model: Bids,
          where: { ClientId: req.params.id },
          attributes: [],
        },
      ],
    });
    
    // Parse images JSON if they're strings
    const parsedItems = items.map(item => {
      const itemData = item.toJSON();
      if (itemData.images) {
        if (typeof itemData.images === 'string') {
          try {
            itemData.images = JSON.parse(itemData.images);
          } catch (e) {
            itemData.images = [itemData.images];
          }
        }
        if (!Array.isArray(itemData.images)) {
          itemData.images = [itemData.images];
        }
      } else {
        itemData.images = [];
      }
      return itemData;
    });
    
    if (parsedItems) return res.status(200).json(parsedItems);
    return res.status(404).json("404");
  } catch (err) {
    res.status(500).json("internal err");
  }
  
};
const getitemswinner=async(req,res)=>{
  try{
    
    let items=await Items.findAll({
      where:{sold:req.params.id}
    })
    
    // Parse images JSON if they're strings
    const parsedItems = items.map(item => {
      const itemData = item.toJSON();
      if (itemData.images) {
        if (typeof itemData.images === 'string') {
          try {
            itemData.images = JSON.parse(itemData.images);
          } catch (e) {
            itemData.images = [itemData.images];
          }
        }
        if (!Array.isArray(itemData.images)) {
          itemData.images = [itemData.images];
        }
      } else {
        itemData.images = [];
      }
      return itemData;
    });
    
    console.log('helo',parsedItems)
    if (parsedItems) return res.status(200).json(parsedItems)
    else return res.status(404).json('error')
  }catch(err){
    res.status(500).json('internal server error')
  }
 
}
module.exports = {
  getitemswinner,
  getItems,
  addItem,
  getAllItems,
  getAll,
  getItemsBided,
  geBid,
};
