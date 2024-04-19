const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Inventory_item extends Model {}

Inventory_item.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        item_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "item",
                key: "id"
            }
        }, 
        inventory_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "inventory",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'inventory_items',
      }
    );



module.exports = Inventory_item;