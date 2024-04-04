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
        },
        // first_name: {
        //   type: DataTypes.STRING
        //   allowNull: false,
        // },
        // last_name: {
        //   type: DataTypes.STRING,
        //   allowNull: false,
        // },
        // email: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        // phone_number: {
        //   type: DataTypes.STRING,
        //   allowNull: false,
        // },
        // address: {
        //   type: DataTypes.STRING,
        //   allowNull: false,
        // },
        // address_two: {
        //   type: DataTypes.STRING,
        //   allowNull: false,
        // },
        // city: {
        //   type: DataTypes.STRING,
        //   allowNull: false,
        // },
        // state: {
        //   type: DataTypes.STRING,
        //   allowNull: false,
        // },
        // zip: {
        //   type: DataTypes.STRING,
        //   allowNull: false,
        // },
        
        
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