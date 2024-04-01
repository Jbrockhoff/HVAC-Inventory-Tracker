const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Invoice extends Model {}

Invoice.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'invoice',
      }
    );

    module.exports = Invoice;