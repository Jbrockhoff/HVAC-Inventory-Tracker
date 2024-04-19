const sequelize = require("../config/connection");
const { User, Item, Inventory } = require("../models");

const userData = require("./userData.json");
const itemData = require("./itemData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const user of users) {
    await Inventory.create({
      user_id: user.id,
    });
  }
  let tmpItems = [];
  for (const item of itemData) {
    const newItem = await Item.create({
      ...item,
    });
    tmpItems.push(newItem);
  };

  process.exit(0);
};

seedDatabase();
