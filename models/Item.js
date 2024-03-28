const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Item extends Model {}

Item.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        quantity:
        {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        cost:
        {
          type: DataTypes.DECIMAL,
          allowNull: false
        },
        retail:
        {
           type: DataTypes.DECIMAL,
           allowNull: false 
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'item',
      }
    );



module.exports = Item;