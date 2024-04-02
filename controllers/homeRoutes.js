const router = require("express").Router();
const { User, Item, Inventory, Invoice, Inventory_item } = require("../models");
const withAuth = require("../utils/auth");

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

// Inventory Route
// Route to get all inventory items
router.get("/inventory", withAuth, async (req, res) => {
  try {
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
          as: 'inventories'
        }
      ]
    })

    const tmpAllItemData = allItemData.map((item) => item.get());
    const tmpInventoryData = inventoryData.map((item) => item.get());
    const items = tmpInventoryData.map((inventory) =>
      inventory.items.map((itm) => itm.get())
    );
    tmpAllItemData.forEach((data) => {
      data.inventories = data.inventories.map((item) => item.get())
    });
    
    res.render("inventory", { userItems: items[0], allItems: tmpAllItemData, inventory_id: tmpInventoryData?.[0]?.id });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Invoice Route
router.get('/invoice', withAuth, async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  try {
    const invoiceData = await Invoice.findAll();
    const invoices = invoiceData.map(item => item.get());
    console.log(invoices);
      res.render('invoice', { invoices });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

// Other Routes
// Add other routes as needed

module.exports = router;
