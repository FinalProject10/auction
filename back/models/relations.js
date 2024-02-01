const Bid = require("./bid");
const Client = require("./clients");
const Admin = require("./admin");
const Items = require("./items");
const Memberships = require("./memberships");
const Seller = require("./sellers");
const Reclamation = require("./reclamation");
const Chat=require('./chat')
Client.hasMany(Bid);
Bid.belongsTo(Client);

Items.hasMany(Bid);
Bid.belongsTo(Items);

Client.hasMany(Reclamation);
Reclamation.belongsTo(Client);

Seller.hasMany(Items);
Items.belongsTo(Seller);

Client.hasMany(Memberships);
Memberships.belongsTo(Client);

Seller.hasMany(Memberships);
Memberships.belongsTo(Seller);

Client.hasMany(Chat)
Chat.belongsTo(Client)

Seller.hasMany(Chat)
Chat.belongsTo(Seller)

// Items.belongsTo(Client, { foreignKey: "clientId", as: "client" });

module.exports = {
  Bid,
  Client,
  Admin,
  Items,
  Memberships,
  Seller,
  Reclamation,
  Chat
};
