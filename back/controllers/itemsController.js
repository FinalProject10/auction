// const Items = require("../models/items");
// const Seller = require("../models/sellers");
// const Client = require("../models/clients");
// const Bids = require("../models/bid");

// const getItems = async (req, res) => {
//   try {
//     const items = await Items.findAll({
//       include: [
//         {
//           model: Seller,
//           as: "seller",
//           attributes: [
//             "id",
//             "name",

//             "lastName",
//             "image",
//             "telNumb",

//             "longitude",
//             "latitude",
//             "address",
//           ],
//         },
//         { model: Bids, as: "bids" },
//       ],
//     });

//     console.log(items);
//     res.status(200).json(items);
//   } catch (error) {
//     console.error(error); // Log the actual error for debugging
//     res
//       .status(500)
//       .json({ message: "Internal server error", error: error.message });
//   }
// };

// module.exports = { getItems };
const Items = require("../models/items");
const Seller = require("../models/sellers");
const Client = require("../models/clients");
const Bids = require("../models/bid");

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

    console.log(items);
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { getItems };
