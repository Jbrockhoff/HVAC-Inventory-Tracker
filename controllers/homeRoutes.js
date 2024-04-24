const router = require("express").Router();
const { User, Item, Inventory, Invoice, Inventory_item } = require("../models");
const withAuth = require("../utils/auth");
const _ = require("lodash");

// Landing Page Route
router.get("/", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/homepage");
  } else {
    // If user is not logged in, render the landing page
    res.render("landingpage");
  }
});

// Homepage Route
router.get("/homepage", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      order: [["name", "ASC"]],
      include: [
        {
          model: Inventory,
        },
      ],
    });
    const user = userData.get({ plain: true });
    res.render("homepage", {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login Route
router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/homepage");
    return;
  }
  res.render("login");
});

// Route to Inventory
router.get("/inventory", withAuth, async (req, res) => {
  try {
    console.log(req.session.user_id);
    const inventoryData = await Inventory.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: Item,
          through: Inventory_item,
          as: "items",
        },
      ],
    });
    const allItemData = await Item.findAll({
      include: [
        {
          model: Inventory,
          through: Inventory_item,
          as: "inventories",
        },
      ],
    });

    const tmpAllItemData = _.map(allItemData, (item) => item.get());
    const tmpInventoryData = _.map(inventoryData, (item) => item.get());
    const items = tmpInventoryData.map((inventory) =>
      inventory.items.map((itm) => itm.get())
    );
    tmpAllItemData.forEach((data) => {
      (data.inventories = data.inventories.map((item) => item.get())),
        (data.inventory_id = tmpInventoryData[0].id);
    });

    res.render("inventory", {
      userItems: items[0],
      logged_in: req.session.logged_in,
      allItems: tmpAllItemData,
      inventory_id: tmpInventoryData[0].id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to invoice, utilization of lodash
router.get("/invoice", withAuth, async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  try {
    const invoiceData = await Invoice.findAll();
    const invoices = _.map(invoiceData, (item) => item.get());
    res.render("invoice", {
      invoices,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to invoice, utilization of lodash
router.get("/admin", withAuth, async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  try {
    const invoiceData = await Invoice.findAll();
    const invoices = _.map(invoiceData, (item) => item.get());
    res.render("orderadmin", {
      invoices,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;