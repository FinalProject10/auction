const Bid = require("./bid");
const Client = require("./clients");
const Admin = require("./admin");
const Items = require("./items");
const Memberships = require("./memberships");
const Seller = require("./sellers");
const Reclamation = require("./reclamation");
const Chat = require("./chat");
const Deposit = require("./deposit");
const ProxyBid = require("./proxyBid");
const AuctionPayment = require("./auctionPayment");
const SellerApproval = require("./sellerApproval");
const Pickup = require("./pickup");
const TitleTransfer = require("./titleTransfer");

// Existing relationships
Client.hasMany(Bid, { as: "bids", foreignKey: "ClientId" });
Bid.belongsTo(Client, { as: "client", foreignKey: "ClientId" });

Items.hasMany(Bid, { as: "bids", foreignKey: "itemId" });
Bid.belongsTo(Items, { as: "item", foreignKey: "itemId" });

Client.hasMany(Reclamation);
Reclamation.belongsTo(Client);

Seller.hasMany(Items, { as: "items", foreignKey: "sellerId" });
Items.belongsTo(Seller, { as: "seller", foreignKey: "sellerId" });

Client.hasMany(Memberships);
Memberships.belongsTo(Client);

Seller.hasMany(Memberships);
Memberships.belongsTo(Seller);

Client.hasMany(Chat);
Chat.belongsTo(Client);

Seller.hasMany(Chat);
Chat.belongsTo(Seller);

// New relationships
Client.hasMany(Deposit, { as: 'deposits', foreignKey: 'clients_id' });
Deposit.belongsTo(Client, { as: 'client', foreignKey: 'clients_id' });

Client.hasMany(ProxyBid, { as: "proxyBids", foreignKey: "clientId" });
ProxyBid.belongsTo(Client, { as: "client", foreignKey: "clientId" });

Items.hasMany(ProxyBid, { as: "proxyBids", foreignKey: "itemId" });
ProxyBid.belongsTo(Items, { as: "item", foreignKey: "itemId" });

Bid.hasOne(AuctionPayment);
AuctionPayment.belongsTo(Bid);

Items.hasMany(AuctionPayment);
AuctionPayment.belongsTo(Items);

Client.hasMany(AuctionPayment);
AuctionPayment.belongsTo(Client);

Items.hasOne(SellerApproval);
SellerApproval.belongsTo(Items);

Bid.hasOne(SellerApproval);
SellerApproval.belongsTo(Bid);

Seller.hasMany(SellerApproval);
SellerApproval.belongsTo(Seller);

Items.hasOne(Pickup);
Pickup.belongsTo(Items);

Client.hasMany(Pickup);
Pickup.belongsTo(Client);

Items.hasOne(TitleTransfer);
TitleTransfer.belongsTo(Items);

Client.hasMany(TitleTransfer);
TitleTransfer.belongsTo(Client);

module.exports = {
  Bid,
  Client,
  Admin,
  Items,
  Memberships,
  Seller,
  Reclamation,
  Chat,
  Deposit,
  ProxyBid,
  AuctionPayment,
  SellerApproval,
  Pickup,
  TitleTransfer,
};
