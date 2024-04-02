const User = require("./User");
const Item = require("./Item");
const Inventory = require("./Inventory");
const Invoice = require("./Invoice");
const Inventory_item = require("./inventory_item");
User.hasOne(Inventory, {
  foreignKey: "user_id",
});

Inventory.belongsTo(User, {
  foreignKey: "user_id",
});
Inventory.belongsToMany(Item, {
  through: Inventory_item,
});

Item.belongsToMany(Inventory, {
  through: Inventory_item,
});

User.hasMany(Invoice, {
  foreignKey: "user_id",
});

module.exports = { User, Item, Inventory, Invoice, Inventory_item };
