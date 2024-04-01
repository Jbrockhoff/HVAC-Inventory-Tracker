const router = require('express').Router();
const { User, Item, Inventory, Invoice } = require('../models');
const withAuth = require('../utils/auth');

// Landing Page Route
router.get('/', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/homepage');
  } else {
    // If user is not logged in, render the landing page
    res.render('landingpage');
  }
});

// Homepage Route
router.get('/homepage', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
      include: [
        {
          model: Inventory,
        }
      ],
    });
    const user = userData.get({ plain: true });
    res.render('homepage', {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login Route
router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }
  res.render('login');
});

// Inventory Route
router.get('/inventory', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  try {
    const itemData = await Item.findAll();
    const items = itemData.map(item => item.get());
    console.log(items);
    res.render('inventory', { items });
  } catch (err) {
    res.json(error);
  }
});

// Other Routes
// Add other routes as needed

module.exports = router;
