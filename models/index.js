const User = require('./User');
const Item = require('./Item');
const Inventory = require("./Inventory");
const Invoice = require('./Invoice')

User.hasOne(Inventory,{
    foreignKey: 'user_id'
})
Inventory.belongsTo(User,{
    foreignKey: 'user_id'
})

Inventory.belongsToMany(Item, {
    through: 'inventory_item',
    as: 'items',
    foreignKey: 'item_id'
});

Item.belongsToMany(Inventory, {
    through: 'inventory_item',
    as: 'inventories',
    foreignKey: 'inventory_id'
});

User.hasMany(Invoice,{
    foreignKey: 'user_id'
});

module.exports = { User, Item, Inventory,Invoice };
