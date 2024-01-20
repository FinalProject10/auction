const Bid = require("./bid");
const Client = require("./clients");
const Admin = require("./admin");
const Items = require("./items");
const Memberships = require("./memberships");
const Seller = require("./sellers");
const Reclamation = require("./reclamation");

Client.hasMany(Bid);
Bid.belongsTo(Client);

Items.hasMany(Bid);
Bid.belongsTo(Items);

Client.hasMany(Reclamation);
Reclamation.belongsTo(Client);

Seller.hasMany(Items);
Items.belongsTo(Seller);

Memberships.hasMany(Client, { foreignKey: "membershipId" });
Client.belongsTo(Memberships);

// Items.belongsTo(Client, { foreignKey: "clientId", as: "client" });

module.exports = {
  Bid,
  Client,
  Admin,
  Items,
  Memberships,
  Seller,
  Reclamation,
};
